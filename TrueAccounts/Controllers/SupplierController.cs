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
    public class SupplierController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;
        private readonly IMapper _mapper;

        public SupplierController(trueAccountsDbcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //[HttpGet("supplierCount")]
        [NonAction]
        public int GetCustomerCount()
        {
            return _context.Supplier.Count()+1;
        }
        // GET: api/Supplier
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSupplier()
        {
            return await _context.Supplier.Include(s => s.supplierBranch).ToListAsync();
        }

        // GET: api/Supplier/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            var supplier = await _context.Supplier.FindAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return supplier;
        }

        // PUT: api/Supplier/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, Supplier supplier)
        {
            if (id != supplier.Id)
            {
                return BadRequest();
            }

            _context.Entry(supplier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Supplier
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(supplierDto supplierRequest)
        {
            var newSupplier = new Supplier();
            //_mapper.Map(supplierRequest, newSupplier);
            newSupplier.supplierCode = "sup-" + GetCustomerCount();
            newSupplier.supplierNumber = supplierRequest.supplierNumber;
            newSupplier.supplierName = supplierRequest.supplierName;
            newSupplier.supplierAddress = supplierRequest.supplierAddress;
            newSupplier.supplierBranchId = supplierRequest.supplierBranchId;
            newSupplier.supplierOpeningbalance = supplierRequest.supplierOpeningbalance;
            newSupplier.supplierCurrentbalance = supplierRequest.supplierCurrentbalance;


            _context.Supplier.Add(newSupplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupplier", new { id = newSupplier.Id }, newSupplier);
        }

        // DELETE: api/Supplier/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplier = await _context.Supplier.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.Supplier.Remove(supplier);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SupplierExists(int id)
        {
            return _context.Supplier.Any(e => e.Id == id);
        }
    }
}
