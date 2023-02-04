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
    public class CashAccountController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public CashAccountController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        [NonAction]
        public int accountCount()
        {
            return _context.CashAccount.Count() + 1;
        }
        // GET: api/CashAccount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CashAccount>>> GetCashAccount()
        {
            var accList = await _context.CashAccount.Include(a => a.accountBranch).ToListAsync();
            return Ok(accList);
        }

        // GET: api/CashAccount/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CashAccount>> GetCashAccount(int id)
        {
            var cashAccount = await _context.CashAccount.FindAsync(id);

            if (cashAccount == null)
            {
                return NotFound();
            }

            return cashAccount;
        }

        // PUT: api/CashAccount/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCashAccount(int id, CashAccount cashAccount)
        {
            if (id != cashAccount.id)
            {
                return BadRequest();
            }

            _context.Entry(cashAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CashAccountExists(id))
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

        // POST: api/CashAccount
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CashAccount>> PostCashAccount(accountDto cashAccountRequest)
        {
            var newCashAccount = new CashAccount();

            newCashAccount.accountCode = "Acc-" + accountCount().ToString();
            newCashAccount.accountTitle = cashAccountRequest.accountTitle;
            newCashAccount.accountBranchId = cashAccountRequest.accountBranchId;
            newCashAccount.accountType = cashAccountRequest.accountType;
            newCashAccount.accountBalance = 0;

            _context.CashAccount.Add(newCashAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCashAccount", new { id = newCashAccount.id }, newCashAccount);
        }

        // DELETE: api/CashAccount/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCashAccount(int id)
        {
            var cashAccount = await _context.CashAccount.FindAsync(id);
            if (cashAccount == null)
            {
                return NotFound();
            }

            _context.CashAccount.Remove(cashAccount);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CashAccountExists(int id)
        {
            return _context.CashAccount.Any(e => e.id == id);
        }
    }
}
