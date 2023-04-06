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
    public class JVInvoiceController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public JVInvoiceController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/JVInvoice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JVInvoice>>> GetJVInvoice()
        {
            return await _context.JVInvoice.ToListAsync();
        }

        // GET: api/JVInvoice/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JVInvoice>> GetJVInvoice(int id)
        {
            var jVInvoice = await _context.JVInvoice.FindAsync(id);

            if (jVInvoice == null)
            {
                return NotFound();
            }

            return jVInvoice;
        }

        // PUT: api/JVInvoice/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJVInvoice(int id, JVInvoice jVInvoice)
        {
            if (id != jVInvoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(jVInvoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JVInvoiceExists(id))
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

        // POST: api/JVInvoice
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JVInvoice>> PostJVInvoice(JVDTO jV)
        {
            try
            {
                int sInvCount = (from j in _context.JVInvoice where j.DateTime.Month == System.DateTime.Now.Month select s).Count() + 1;
                var jvInv = new JVInvoice();
                //jvInv.Id = jV.Id;
                jvInv.Code = "JV" + System.DateTime.Now.Year + System.DateTime.Now.Month.ToString("00") + sInvCount.ToString("00000");
                jvInv.Particular = jV.Particular;
                jvInv.DateTime = jV.DateTime;
                jvInv.Remarks = jV.Remarks;
                jvInv.BranchId = jV.BranchId;
                jvInv.UserId = jV.UserId;
                jvInv.EnterDt = jV.EnterDt;

              //  _context.JVInvoice.Add(jV);
                await _context.SaveChangesAsync();

                foreach(JVInvDetail item in jV.Detail) { 
                
                    var jvd = new JVInvDetail();
                   // jvd.Id = item.Id;
                    jvd.Particular = item.Particular;
                    jvd.CoaCode= item.CoaCode;
                    jvd.Credit = item.Credit;
                    jvd.Debit  = item.Debit;
                    jvd.JvInvId = jvInv.Id;

                 //   _context.JVInvDetails.Add(jvd);
                    await _context.SaveChangesAsync();  
                }
            }

            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           

            return CreatedAtAction("GetJVInvoice", new { id = jV.Id }, jV);
        }

        // DELETE: api/JVInvoice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJVInvoice(int id)
        {
            var jVInvoice = await _context.JVInvoice.FindAsync(id);
            if (jVInvoice == null)
            {
                return NotFound();
            }

            _context.JVInvoice.Remove(jVInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JVInvoiceExists(int id)
        {
            return _context.JVInvoice.Any(e => e.Id == id);
        }
    }
}
