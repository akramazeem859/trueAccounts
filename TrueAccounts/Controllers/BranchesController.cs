using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrueAccounts.Data;
using TrueAccounts.Dto;
using TrueAccounts.Models;
using TrueAccounts.Models.ChartAccount;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;
        private readonly IMapper _mapper;

        public BranchesController(trueAccountsDbcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [Authorize]
        // GET: api/Branches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Branch>>> GetBranches()
        {
              var b =  await _context.Branches.Include(c => c.company).ToListAsync();
            return Ok(b);
        }

        // GET: api/Branches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranch(int id)
        {
            var branch = await _context.Branches.FindAsync(id);

            if (branch == null)
            {
                return NotFound();
            }

            return branch;
        }

        // PUT: api/Branches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBranch(int id, Branch branch)
        {
            if (id != branch.id)
            {
                return BadRequest();
            }

            _context.Entry(branch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
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


        [NonAction]
        private string generateCode(string code, int brchId)
        {
            var coaCount = code + ((_context.level4
                           .Where(l4 => l4.level3 == code )
                           .Count() + 1).ToString("000"));
            return coaCount.ToString();
        }
        // POST: api/Branches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranch(branchAddDto branchRequest)
        {
            var newBranch = new Branch();

            newBranch.branchName = branchRequest.branchName;
            newBranch.companyId = branchRequest.companyId;
            newBranch.supervisor = branchRequest.supervisor;
            newBranch.contactNumber = branchRequest.contactNumber;
           
            _context.Branches.Add(newBranch);
            await _context.SaveChangesAsync();

            level4 lvl4 = new level4();
            lvl4.code = generateCode("50301", newBranch.id);
            lvl4.name = branchRequest.branchName;
            lvl4.level3 = "50301";
            lvl4.branchId = newBranch.id;
            _context.level4.Add(lvl4);
            _context.SaveChanges();

            Customer cust = new Customer();
            cust.customerName = "Anomynous";
            cust.customerNumber = "0000000";
            cust.customerCurrentbalance = 0;
            cust.customerAddress = "None";
            cust.customerBranchId = newBranch.id;
            cust.customerCode = lvl4.code;
            _context.Customer.Add(cust);
            _context.SaveChanges();

            return CreatedAtAction("GetBranch", new { id = newBranch.id }, newBranch);
        }

        // DELETE: api/Branches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }

            _context.Branches.Remove(branch);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BranchExists(int id)
        {
            return _context.Branches.Any(e => e.id == id);
        }
    }
}
