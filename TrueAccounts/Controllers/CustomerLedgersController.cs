using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrueAccounts.Data;
using TrueAccounts.Dto;
using TrueAccounts.Models.Ledgers;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerLedgersController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public CustomerLedgersController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/CustomerLedgers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerLedger>>> GetCustomerLedger()
        {
            return await _context.CustomerLedger.ToListAsync();
        }

        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<customerLedgerResult>>> SearchCustomerLedger([FromQuery] customerLedgerDTO req)
        {
            List<customerLedgerResult> clist = new List<customerLedgerResult>();
            customerLedgerResult c = new customerLedgerResult();
                
            var rlist = await _context.CustomerLedger.Where(c => c.CoaCode == req.customerId).ToListAsync();

            int bal = 0; 

            foreach (var r in rlist)
            {
                c.Id = r.Id;
                c.Type = r.Type;
                c.InvCode = r.InvCode;
                c.Debit = r.Debit;
                c.Credit = r.Credit;
                c.DateTime = r.DateTime;    
                c.Particular = r.Particular;
                c.Balance = bal + (r.Debit - r.Credit);

                clist.Add(c);
            }

            return Ok(clist); 
        }

        // GET: api/CustomerLedgers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerLedger>> GetCustomerLedger(int id)
        {
            var customerLedger = await _context.CustomerLedger.FindAsync(id);

            if (customerLedger == null)
            {
                return NotFound();
            }

            return customerLedger;
        }

        // PUT: api/CustomerLedgers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerLedger(int id, CustomerLedger customerLedger)
        {
            if (id != customerLedger.Id)
            {
                return BadRequest();
            }

            _context.Entry(customerLedger).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerLedgerExists(id))
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

        // POST: api/CustomerLedgers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerLedger>> PostCustomerLedger(CustomerLedger customerLedger)
        {
            _context.CustomerLedger.Add(customerLedger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerLedger", new { id = customerLedger.Id }, customerLedger);
        }

        // DELETE: api/CustomerLedgers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerLedger(int id)
        {
            var customerLedger = await _context.CustomerLedger.FindAsync(id);
            if (customerLedger == null)
            {
                return NotFound();
            }

            _context.CustomerLedger.Remove(customerLedger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerLedgerExists(int id)
        {
            return _context.CustomerLedger.Any(e => e.Id == id);
        }
    }
}
