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
using TrueAccounts.Models.ChartAccount;
using TrueAccounts.Utility;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public CustomerController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        [HttpGet("customerCount")]
        public int GetCustomerCount()
        {
            return _context.Customer.Count();
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            //var customerList = await _context.Customer.ToListAsync();
            var custList = await _context.Customer.Include(c => c.customerBranch).ToListAsync();
            return custList;
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        private string generateCode(string code)
        {
            var coaCount = code + ((_context.level4
                           .Where(l4 => l4.level3 == code)
                           .Count() + 1).ToString("000"));
            return coaCount.ToString();
        }
        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(customerDto customerReq)
        {
            level4 lvl4 = new level4();

            lvl4.code = generateCode("50301");
            lvl4.name = customerReq.customerName;
            lvl4.level3 = "50301";
            lvl4.branchId = customerReq.customerBranchId;
            _context.level4.Add(lvl4);
            _context.SaveChanges(); 


            Customer customer = new Customer();
            //customer.customerCode = customerReq.customerCode;
            customer.customerName = customerReq.customerName;   
            customer.customerNumber = customerReq.customerNumber;
            customer.customerAddress= customerReq.customerAddress;
            customer.customerCurrentbalance = customerReq.customerOpeningbalance;
            customer.customerOpeningbalance= customerReq.customerOpeningbalance;
            customer.customerBranchId = customerReq.customerBranchId;
            customer.customerCode = lvl4.code;

            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
