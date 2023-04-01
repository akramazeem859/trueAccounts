using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrueAccounts.Data;
using TrueAccounts.Models.ChartAccount;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartAccountController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public ChartAccountController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/ChartAccount
        [HttpGet("coa/level1")]
        public async Task<ActionResult<IEnumerable<level1>>> Getlevel1()
        {
            return await _context.level1.ToListAsync();
        }
        [HttpGet("coa/level2")]
        public async Task<ActionResult<IEnumerable<level2>>> Getlevel2()
        {
            return await _context.level2.ToListAsync();
        }
        [HttpGet("coa/level3")]
        public async Task<ActionResult<IEnumerable<level3>>> Getlevel3()
        {
            return await _context.level3.ToListAsync();
        }
        [HttpGet("coa/level4")]
        public async Task<ActionResult<IEnumerable<level4>>> Getlevel4()
        {
            return await _context.level4.ToListAsync();
        }



        // GET: api/ChartAccount/5
        [HttpGet("{id}")]
        public async Task<ActionResult<level1>> Getlevel1(int id)
        {
            var level1 = await _context.level1.FindAsync(id);

            if (level1 == null)
            {
                return NotFound();
            }

            return level1;
        }
        [HttpGet("coa/level2/{id}")]
        public async Task<ActionResult<IEnumerable<level2>>> Getlevel2(string id)
        {
            var level2 = await _context.level2 
                         .Where(l2 => l2.level1 == id) 
                         .ToListAsync();

            if (level2 == null)
            {
                return NotFound();
            }

            return  level2;
        }

        // PUT: api/ChartAccount/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putlevel1(int id, level1 level1)
        {
            if (id != level1.id)
            {
                return BadRequest();
            }

            _context.Entry(level1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!level1Exists(id))
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

        // POST: api/ChartAccount
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("level1")]
        public async Task<ActionResult<level1>> Postlevel1(level1 l1Req)
        {
            level1 l1 = new level1();

            l1.name = l1Req.name;
            l1.code = (_context.level1.Count()+1).ToString();
            _context.level1.Add(l1);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlevel1", new { id = l1.id }, l1);
        }

        [HttpPost("level2")]
        public async Task<ActionResult<level1>> Postlevel2(level2 l2Req)
        {
            level2 l2 = new level2();

            l2.name = l2Req.name;
            l2.level1 = l2Req.level1;
            var count = (from c in _context.level2
                         where c.level1 == l2.level1 
                         select c ).ToList().Count;

            l2.code = l2Req.level1 + (count + 1).ToString("00");
            _context.level2.Add(l2);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlevel1", new { id = l2.id }, l2);
        }

        [HttpPost("level3")]
        public async Task<ActionResult<level3>> Postlevel3(level3 l3Req)
        {
            level3 l3 = new level3();

            l3.name = l3Req.name;
            l3.level2 = l3Req.level2;
            var count = (from c in _context.level3
                         where c.level2 == l3.level2
                         select c).ToList().Count;

            l3.code = l3Req.level2 + (count + 1).ToString("00");
            _context.level3.Add(l3);
            await _context.SaveChangesAsync();

            return l3;
        }

        [HttpPost("level4")]
        public async Task<ActionResult<level4>> Postlevel4(level4 l4Req)
        {
            level4 l4 = new level4();

            l4.name = l4Req.name;
            l4.level3 = l4Req.level3;
            var count = (from c in _context.level4
                         where c.level3 == l4.level3
                         select c).ToList().Count;

            l4.code = l4Req.level3 + (count + 1).ToString("000");
            l4.branchId = l4Req.branchId;
            l4.ledgerTbl = l4Req.ledgerTbl;

            _context.level4.Add(l4);
            await _context.SaveChangesAsync();

            return l4;
        }





        // DELETE: api/ChartAccount/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletelevel1(int id)
        {
            var level1 = await _context.level1.FindAsync(id);
            if (level1 == null)
            {
                return NotFound();
            }

            _context.level1.Remove(level1);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool level1Exists(int id)
        {
            return _context.level1.Any(e => e.id == id);
        }
    }
}
