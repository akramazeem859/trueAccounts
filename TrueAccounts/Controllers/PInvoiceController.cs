using System;
using System.Collections.Generic;
using System.Linq;
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

        // PUT: api/PInvoice/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPInvoice(int id, PInvoice pInvoice)
        {
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
            int pInvCount = (from p in _context.PInvoices where p.datetime.Month == System.DateTime.Now.Month select p).Count(); 
            var newpInvoice = new PInvoice();
            newpInvoice.code = "PI"+System.DateTime.Now.Year+System.DateTime.Now.Month.ToString("00") + pInvCount.ToString("00000");
            newpInvoice.payable = pInvRequest.payable;
            newpInvoice.paid = pInvRequest.paid;
            newpInvoice.supplierId = pInvRequest.supplierId;
            newpInvoice.freight = pInvRequest.freight;
            newpInvoice.datetime = System.DateTime.Now;
            newpInvoice.branchId = 1;

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

            //_context.pInvDetails.AddRange(newpInvDetailList);
            //_context.SaveChanges();

            return (newpInvoice);

            //return CreatedAtAction("GetPInvoice", new { id = newpInvoice.id }, newpInvoice);
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
