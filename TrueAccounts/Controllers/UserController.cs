using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrueAccounts.Data;
using TrueAccounts.Models;

namespace TrueAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly trueAccountsDbcontext _context;

        public UserController(trueAccountsDbcontext context)
        {
            _context = context; 
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authentication([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            try
            {
               var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email && x.password == userObj.password);
               if(user == null)
                return NotFound(new {Message = "User Not Found!"});
            }
            catch(Exception ex)
            {
                var msg = ex.InnerException.Message;
            }
            return Ok(new { Message = "Login Success!" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();
            try
            {
               
                
            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                var msg = ex.InnerException.Message;
            }

            return Ok(new {Message="User Registered!"});
        }
    }
}
