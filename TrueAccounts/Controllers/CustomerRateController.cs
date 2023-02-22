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
    public class CustomerRateController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public CustomerRateController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/CustomerRate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerRate>>> GetCustomerRate()
        {
            return await _context.CustomerRate.ToListAsync();
        }

        // GET: api/CustomerRate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerRate>> GetCustomerRate(int id)
        {
            var customerRate = await _context.CustomerRate.FindAsync(id);

            if (customerRate == null)
            {
                return NotFound();
            }

            return customerRate;
        }

        [HttpGet("byCust/{id}")]
        public async Task<ActionResult<IEnumerable<CustomerRate>>> GetCusRateByCust(int id)
        {
            var customerRate = await _context.CustomerRate
                               .Where(c => c.customerId == id)
                               .ToListAsync();

            if (customerRate == null)
            {
                return NotFound();
            }

            return customerRate;
        }

        [HttpGet("byProd/{cusId}/{prodId}")]
        public async Task<ActionResult<CustomerRate>> GetCusRateByProd(int cusId, int prodId)
        {
            var customerRate = await _context.CustomerRate
                               .Where(c => c.customerId == cusId & c.productId == prodId)
                               .SingleOrDefaultAsync();

            if (customerRate == null)
            {
                return NotFound();
            }

            return customerRate;
        }

        // PUT: api/CustomerRate/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerRate(int id, CustomerRate customerRate)
        {
            if (id != customerRate.Id)
            {
                return BadRequest();
            }

            _context.Entry(customerRate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerRateExists(id))
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

        // POST: api/CustomerRate
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerRate>> PostCustomerRate(customerRateDTO[] customerRate )
        {
            var tempCustomerRate = new CustomerRate();

            List<CustomerRate> customerRateList = null;
            customerRateList = new List<CustomerRate>();

            foreach(var item in customerRate)
            {
                var tempCusRate = _context.CustomerRate
                                  .Where(cr => cr.customerId == item.CustomerId & cr.productId == item.productId)
                                  .SingleOrDefault();
                if(tempCusRate == null)
                {
                    CustomerRate newcusRate = new CustomerRate();
                    newcusRate.customerId = item.CustomerId;
                    newcusRate.productId = item.productId;
                    newcusRate.rate = item.rate; 

                    customerRateList.Add(newcusRate);

                  //  _context.CustomerRate.Add(tempCustomerRate);
                  //  await _context.SaveChangesAsync(); 
                }
                else
                {
                    tempCustomerRate =  tempCusRate;
                    tempCustomerRate.rate = item.rate;

                    await _context.SaveChangesAsync(); 
                }
            }
            if (customerRateList != null)
            {
                _context.AddRange(customerRateList);
                await _context.SaveChangesAsync();
            }

            //await _context.SaveChangesAsync();
            return Ok(tempCustomerRate);

            //return CreatedAtAction("GetCustomerRate", new { id = customerRate.innerCustRateDTOs }, customerRate);
        }

        // DELETE: api/CustomerRate/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerRate(int id)
        {
            var customerRate = await _context.CustomerRate.FindAsync(id);
            if (customerRate == null)
            {
                return NotFound();
            }

            _context.CustomerRate.Remove(customerRate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{cusId}/{prodId}")]
        public async Task<IActionResult> DeleteCusRate(int cusId, int prodId)
        {
            var customerRate = await _context.CustomerRate
                                .Where(cr => cr.customerId == cusId & cr.productId == prodId)
                                .FirstOrDefaultAsync();
            if (customerRate == null)
            {
                return NotFound();
            }

            _context.CustomerRate.Remove(customerRate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerRateExists(int id)
        {
            return _context.CustomerRate.Any(e => e.Id == id);
        }
    }
}
