using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    public class BranchesController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;
        private readonly IMapper _mapper;

        public BranchesController(trueAccountsDbcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

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
