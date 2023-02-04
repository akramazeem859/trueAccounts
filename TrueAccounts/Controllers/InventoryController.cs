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
    public class InventoryController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public InventoryController(trueAccountsDbcontext context)
        {
            _context = context;
        }

        // GET: api/Inventory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventory()
        {
            var invList =  await _context.Inventory
                .Include(i => i.branch)
                .Include(i => i.product)
                .ToListAsync();

            return Ok(invList);
        }

        // GET: api/Inventory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inventory>> GetInventory(int id)
        {
            var inventory = await _context.Inventory.FindAsync(id);

            if (inventory == null)
            {
                return NotFound();
            }

            return inventory;
        }

        [HttpGet("branchId/{id}")]
        public async Task<ActionResult<Inventory[]>> GetInventorybyBranch(int id)
        {
            var inventoryList = await _context.Inventory
                .Where(i => i.branchId == id)
                .Include(i => i.branch)
                .Include(i => i.product)
                .ToListAsync();

            if (inventoryList == null)
            {
                return NotFound();
            }

            return Ok(inventoryList);
        }


        // PUT: api/Inventory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory(int id, Inventory inventory)
        {
            if (id != inventory.id)
            {
                return BadRequest();
            }

            _context.Entry(inventory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
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

        // POST: api/Inventory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inventory>> PostInventory(inventoryDto inventoryRequest)
        {
            var newInventory = new Inventory();
            newInventory.productId = inventoryRequest.productId;
            newInventory.quantity = inventoryRequest.quantity;
            newInventory.branchId = inventoryRequest.branchId;

            _context.Inventory.Add(newInventory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventory", new { id = newInventory.id }, newInventory);
        }

        // DELETE: api/Inventory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory(int id)
        {
            var inventory = await _context.Inventory.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventory.Remove(inventory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventory.Any(e => e.id == id);
        }
    }
}
