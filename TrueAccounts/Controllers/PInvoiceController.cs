using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrueAccounts.Data;
using TrueAccounts.Dto;
using TrueAccounts.Models;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PInvoiceController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public PInvoiceController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/PInvoice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PInvoice>>> GetPInvoices()
        {
            return await _context.PInvoices.Include(p => p.supplier).ToListAsync();
        }

        // GET: api/PInvoice/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PInvoice>> GetPInvoice(int id)
        {
            var pInvoice = await _context.PInvoices.FindAsync(id);

            if (pInvoice == null)
            {
                return NotFound();
            }

            return pInvoice;
        }

        [HttpGet("code/{code}")]
        public async Task<ActionResult<PInvoice>> GetPInvoiceByCode(string code)
        {
            //var pInvoice = await _context.PInvoices.FindAsync(id);

            var pInvoice = await _context.PInvoices
                .Where(p => p.code == code)
                .Include(p => p.supplier)
                .FirstOrDefaultAsync();


            if (pInvoice == null)
            {
                return NotFound();
            }

            return pInvoice;
        }

        [HttpGet("Detail/{id}")]
        public async Task<ActionResult<List<PInvDetail>>> GetPInvDetail(int id)
        {
            //var pInvoice = await _context.PInvoices.FindAsync(id);

            var pInvDetail = await _context.pInvDetails
                .Where(p => p.pInvoiceId == id)
                .Include(p=> p.product)
                .ToListAsync();

            if (pInvDetail == null)
            {
                return NotFound();
            }
            return pInvDetail;
        }


        // PUT: api/PInvoice/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPInvoice(int id, PInvoice pInvoice)
        {
            var pDetailList = (from pd in _context.pInvDetails where pd.pInvoiceId == id select pd).ToList();

            revokeInventory(pInvoice.branchId, pDetailList);

            updatePDetail(pInvoice);

            var newpDetailList = (from pd in _context.pInvDetails where pd.pInvoiceId == id select pd).ToList();
            updateInvtory(pInvoice.branchId, newpDetailList);

            if (id != pInvoice.id)
            {
                return BadRequest();
            }

            _context.Entry(pInvoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PInvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PInvoice
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PInvoice>> PostPInvoice(purcInvDTO pInvRequest)
        {
            int pInvCount = (from p in _context.PInvoices where p.datetime.Month == System.DateTime.Now.Month select p).Count()+1; 
            var newpInvoice = new PInvoice();
            newpInvoice.code = "PI"+System.DateTime.Now.Year+System.DateTime.Now.Month.ToString("00") + pInvCount.ToString("00000");
            newpInvoice.payable = pInvRequest.payable;
            newpInvoice.paid = pInvRequest.paid;
            newpInvoice.supplierId = pInvRequest.supplierId;
            newpInvoice.freight = pInvRequest.freight;
            newpInvoice.datetime = System.DateTime.Now;
            newpInvoice.branchId = 1;
            newpInvoice.accountId = pInvRequest.accountId;

            _context.PInvoices.Add(newpInvoice);
            await _context.SaveChangesAsync();


            var newpInvDetail = new PInvDetail();

            var newpInvDetailList = new List<PInvDetail> { };

            foreach (var item in pInvRequest.detail)
            {
                newpInvDetail.id = 0;
                newpInvDetail.productId = item.productId;
                newpInvDetail.purchasePrice = item.purchasePrice;
                newpInvDetail.quantity = item.quantity;
                newpInvDetail.pInvoiceId = newpInvoice.id;

                _context.pInvDetails.Add(newpInvDetail);
                _context.SaveChanges();

                newpInvDetailList.Add(newpInvDetail);
                
            }
            updateInvtory(newpInvoice.branchId, newpInvDetailList);

            //_context.pInvDetails.AddRange(newpInvDetailList);
            //_context.SaveChanges();

            return (newpInvoice);

            //return CreatedAtAction("GetPInvoice", new { id = newpInvoice.id }, newpInvoice);
        }

        protected void updatePDetail(PInvoice pInvoice)
        {
            var tempPInv = pInvoice;
            foreach (var item in tempPInv.pInvDetails)
            {
                if (item.id != 0)
                {
                    var pd = (from p in _context.pInvDetails where p.id == item.id select p).SingleOrDefault();
                    if (pd != null)
                    {
                        pd.productId = item.productId;
                        pd.quantity = item.quantity;
                        pd.purchasePrice = item.quantity;
                        _context.SaveChanges();
                    }
                   // _context.Entry(item).State = EntityState.Modified;
                }
                else
                {
                    item.pInvoiceId = tempPInv.id;
                    _context.pInvDetails.Add(item);
                }
            }
        }
      
        protected void updateInvtory(int bId, List<PInvDetail> pDetail)
        {
            var inv = new Inventory();

            foreach (var item in pDetail)
            {
                inv = (from i in _context.Inventory where 
                       i.productId == item.productId &&
                       i.branchId == bId 
                       select i).SingleOrDefault();
                if (inv != null)
                {
                    inv.quantity += item.quantity;
                    _context.SaveChanges();
                }
                else
                {
                    var inv2 = new Inventory();
                    inv2.id = 0;
                    inv2.productId = item.productId;
                    inv2.quantity = item.quantity;
                    inv2.branchId = bId;
                    _context.Inventory.Add(inv2);
                    _context.SaveChanges();
                }
            }
        }

        protected void revokeInventory(int bId, List<PInvDetail> oldPdetail)
        {
            foreach(var item in oldPdetail)
            {
                var inv = (from i in _context.Inventory where i.productId == item.productId && i.branchId == bId select i).SingleOrDefault();
                if(inv != null)
                {
                    inv.quantity -= item.quantity;
                    _context.SaveChanges(); 
                }
            }

        }

        // DELETE: api/PInvoice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePInvoice(int id)
        {
            var pInvoice = await _context.PInvoices.FindAsync(id);
            if (pInvoice == null)
            {
                return NotFound();
            }

            _context.PInvoices.Remove(pInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PInvoiceExists(int id)
        {
            return _context.PInvoices.Any(e => e.id == id);
        }
    }
}
