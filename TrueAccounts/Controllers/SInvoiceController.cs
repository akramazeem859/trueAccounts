using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using TrueAccounts.Data;
using TrueAccounts.Dto;
using TrueAccounts.Models;
using TrueAccounts.Models.Ledgers;
using TrueAccounts.Utility;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SInvoiceController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public SInvoiceController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/SInvoice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SInvoice>>> GetSInvoice()
        {
            return await _context.SInvoice.ToListAsync();
        }

        // GET: api/SInvoice/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SInvoice>> GetSInvoice(int id)
        {
            var sInvoice = await _context.SInvoice.FindAsync(id);

            if (sInvoice == null)
            {
                return NotFound();
            }

            return sInvoice;
        }

        [HttpGet("code/{code}")]
        public async Task<ActionResult<SInvoice>> GetSInvoiceByCode(string code)
        {
            //var pInvoice = await _context.PInvoices.FindAsync(id);

            var sInvoice = await _context.SInvoice
                .Where(s => s.code == code)
                .Include(s => s.customer)
                .Include(s=> s.branch)
                .Include(s => s.sInvDetail)
                .FirstOrDefaultAsync();


            if (sInvoice == null)
            {
                return NotFound();
            }

            return sInvoice;
        }

        [HttpGet("Detail/{id}")]
        public async Task<ActionResult<List<SInvDetail>>> GetSInvDetail(int id)
        {
            //var pInvoice = await _context.PInvoices.FindAsync(id);

            var sInvDetail = await _context.sInvDetails
                .Where(s => s.sInvoiceId == id)
                .Include(s => s.product)
                .ToListAsync();

            if (sInvDetail == null)
            {
                return NotFound();
            }
            return sInvDetail;
        }

        // PUT: api/SInvoice/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSInvoice(int id, SInvoice sInvoice)
        {
            var sDetailList = (from sd in _context.sInvDetails where sd.sInvoiceId == id select sd).ToList();

            revokeInventory(sInvoice.branchId, sDetailList);

            updatesDetail(sInvoice);

            var newsDetailList = (from sd in _context.sInvDetails where sd.sInvoiceId == id select sd).ToList();

            updateInvtory(sInvoice.branchId, newsDetailList);

            if (id != sInvoice.id)
            {
                return BadRequest();
            }

            _context.Entry(sInvoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SInvoiceExists(id))
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

        protected void updatesDetail(SInvoice sInvoice)
        {
            var tempSInv = sInvoice;
            foreach (var item in tempSInv.sInvDetail)
            {
                if (item.id != 0)
                {
                    var sd = (from s in _context.sInvDetails where s.id == item.id select s).SingleOrDefault();
                    if (sd != null)
                    {
                        sd.productId = item.productId;
                        sd.quantity = item.quantity;
                        sd.salePrice = item.salePrice;
                        _context.SaveChanges();
                    }
                    // _context.Entry(item).State = EntityState.Modified;
                }
                else
                {
                    item.sInvoiceId = tempSInv.id;
                    _context.sInvDetails.Add(item);
                    _context.SaveChanges();
                }
            }
        }


        protected void revokeInventory(int bId, List<SInvDetail> oldSdetail)
        {
            foreach (var item in oldSdetail)
            {
                var inv = (from i in _context.Inventory where i.productId == item.productId && i.branchId == bId select i).SingleOrDefault();
                if (inv != null)
                {
                    inv.quantity += item.quantity;
                    _context.SaveChanges();
                }
            }

        }

        protected void updateInvtory(int bId, List<SInvDetail> sDetail)
        {
            var inv = new Inventory();

            foreach (var item in sDetail)
            {
                inv = (from i in _context.Inventory
                       where
                       i.productId == item.productId &&
                       i.branchId == bId
                       select i).SingleOrDefault();
                if (inv != null)
                {
                    inv.quantity -= item.quantity;
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

        // POST: api/SInvoice
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostSInvoice(saleInvDTO sInvRequest)
        {

            int tempBranchId = sInvRequest.branchId;

           // using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
           // {
                try
                {
                    string timezoneValue = "5:00";

                    TimeSpan offset = new TimeSpan();
                    offset = TimeSpan.Parse(timezoneValue);

                    var newtime = new DateTime();

                    newtime = sInvRequest.datetime + offset;

                    int sInvCount = (from s in _context.SInvoice where s.datetime.Month == System.DateTime.Now.Month select s).Count() + 1;
                    var newsInvoice = new SInvoice();
                    newsInvoice.code = "SI" + System.DateTime.Now.Year + System.DateTime.Now.Month.ToString("00") + sInvCount.ToString("0000");
                    newsInvoice.payable = sInvRequest.payable;
                    newsInvoice.paid = sInvRequest.paid;
                    newsInvoice.customerId = sInvRequest.customerId;
                    newsInvoice.freight = sInvRequest.freight;
                    newsInvoice.discount = sInvRequest.discount;
                    newsInvoice.datetime = newtime;
                    newsInvoice.branchId = sInvRequest.branchId;
                    newsInvoice.accountId = sInvRequest.accountId;

                    _context.SInvoice.Add(newsInvoice);
                    await _context.SaveChangesAsync();

                    var newsInvDetail = new SInvDetail();
                    var newsInvDetailList = new List<SInvDetail> { };

                    foreach (var item in sInvRequest.detail)
                    {
                        newsInvDetail.id = 0;
                        newsInvDetail.productId = item.productId;
                        newsInvDetail.salePrice = item.salePrice;
                        newsInvDetail.quantity = item.quantity;
                        newsInvDetail.sInvoiceId = newsInvoice.id;

                        _context.sInvDetails.Add(newsInvDetail);
                        _context.SaveChanges();

                        newsInvDetailList.Add(newsInvDetail);

                    }
                    updateInvtory(newsInvoice.branchId, newsInvDetailList);

                    //Ledger ldgr = new Ledger();
                    //ldgr.Particular = "Sale Invoice ";
                    //ldgr.Type = "SI";
                    //ldgr.DateTime = newsInvoice.datetime;
                    //ldgr.Credit = newsInvoice.payable - (newsInvoice.discount + newsInvoice.freight);
                    //ldgr.Debit = 0;
                    //ldgr.BranchId = tempBranchId;
                    //ldgr.InvCode = newsInvoice.code;
                    //_context.Ledger.Add(ldgr);
                    //_context.SaveChanges();



                    SaleLedger sldgr = new SaleLedger();
                    sldgr.Id = 0;
                    sldgr.Particular = "Sale Invoice";
                    sldgr.Type = "SI";
                    sldgr.Credit = newsInvoice.payable - (newsInvoice.discount + newsInvoice.freight);
                    sldgr.Debit = 0;
                    sldgr.DateTime = newsInvoice.datetime;
                    sldgr.InvCode = newsInvoice.code;
                    sldgr.BranchId = tempBranchId;
                    var sale_tempCoaCode = _context.level4.Where(l => l.name == "Local Sales" & l.branchId == tempBranchId).FirstOrDefault();
                    if (sale_tempCoaCode != null)
                    {
                        sldgr.CoaCode = sale_tempCoaCode.code;
                    }
                    else
                    {
                        sldgr.CoaCode = "";
                    }

                    _context.SaleLedger.Add(sldgr);
                    _context.SaveChanges();


                    var tempCustomer = _context.Customer.Where(c => c.Id == newsInvoice.customerId).SingleOrDefault();
                    string tempCoaCode;
                    int tempRecivable = (newsInvoice.payable - newsInvoice.discount + newsInvoice.freight)- newsInvoice.paid;
                    
                    if (tempCustomer != null)
                    {
                        tempCoaCode = tempCustomer.customerCode;
                    tempCustomer.customerPrevioubalance = tempCustomer.customerCurrentbalance;
                    tempCustomer.customerCurrentbalance = tempCustomer.customerCurrentbalance + tempRecivable ; 
                    }
                    else
                    {
                        tempCoaCode = "";
                    }
                    CustomerLedger cldgr = new CustomerLedger();
                    cldgr.Particular = "Sale Invoice";
                    cldgr.Type = "SI";
                    cldgr.InvCode = newsInvoice.code;
                    cldgr.DateTime = newsInvoice.datetime;
                    cldgr.Credit = newsInvoice.payable - newsInvoice.discount;
                    cldgr.Debit = 0;
                    cldgr.BranchId = tempBranchId;
                    var cust_tempCoaCode = _context.level4.Where(l => l.code == tempCoaCode & l.branchId == tempBranchId).FirstOrDefault();
                    if (cust_tempCoaCode != null)
                    {
                        cldgr.CoaCode = cust_tempCoaCode.code;
                    }
                    else
                    {
                        cldgr.CoaCode = "";
                    }
                    cldgr.InvCode = newsInvoice.customer.customerCode;

                    _context.CustomerLedger.Add(cldgr);
                    _context.SaveChanges();



                    var tempAccount = _context.CashAccount.Where(c => c.id == newsInvoice.accountId).SingleOrDefault();
                    //string tempCoaCode;
                    if (tempCustomer != null)
                    {
                        tempCoaCode = tempAccount.accountCode;
                    }
                    else
                    {
                        tempCoaCode = "";
                    }
                    CashAccountLedger caldgr = new CashAccountLedger();
                    caldgr.Particular = "Sale Invoice ";
                    caldgr.DateTime = newsInvoice.datetime;
                    caldgr.Type = "SI";
                    caldgr.Credit = newsInvoice.paid;
                    caldgr.Debit = 0;
                    caldgr.InvCode = newsInvoice.code;
                    caldgr.BranchId = tempBranchId;
                    var ca_tempCaoCode = _context.level4.Where(l => l.code == tempCoaCode & l.branchId == tempBranchId).FirstOrDefault();
                    if (ca_tempCaoCode != null)
                    {
                        caldgr.CoaCode = ca_tempCaoCode.code;
                    }
                    else
                    {
                        caldgr.CoaCode = "";
                    }
                    _context.CashAccountLedger.Add(caldgr);
                    _context.SaveChanges();

                    //_context.pInvDetails.AddRange(newpInvDetailList);
                    //_context.SaveChanges();

                    return Ok(newsInvoice);
                }
                catch (Exception ex)
                {
                    //transaction.Rollback();
                    return BadRequest(ex.Message);
                }
           // }
        }

      

       

        // DELETE: api/SInvoice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSInvoice(int id)
        {
            var sInvoice = await _context.SInvoice.FindAsync(id);
            if (sInvoice == null)
            {
                return NotFound();
            }

            _context.SInvoice.Remove(sInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SInvoiceExists(int id)
        {
            return _context.SInvoice.Any(e => e.id == id);
        }
    }
}
