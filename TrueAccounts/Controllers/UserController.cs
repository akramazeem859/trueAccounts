using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TrueAccounts.Data;
using TrueAccounts.Helpers;
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
            var user = new User();
            try
            {
               user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName );
               if(user == null)
                return NotFound(new {Message = "User Not Found!"});

               if(!PasswordHasher.VeriftyPassword(userObj.password , user.password))
                {
                    return BadRequest(new { Message = "Password is Incorrent" });
                }
            }
            catch(Exception ex)
            {
                var msg = ex.InnerException.Message;
            }

            user.Token = CreateJwt(user);
            return Ok(new 
            { 
                Token = user.Token,
                Message = "Login Success!" 
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if(userObj == null || userObj.Email == null)
                return BadRequest();

           

            try
            {
                if (await checkEmail(userObj.Email))
                    return BadRequest(new { Message = "Email Already Exits!" });

                if (await checkUsername(userObj.UserName))
                    return BadRequest(new { Message = "User Name Already Exits!" });

                userObj.password = PasswordHasher.HashPassword(userObj.password);
                userObj.Token = "";
                
                await _context.Users.AddAsync(userObj);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                var msg = ex.InnerException.Message;
            }

            return Ok(new {Message="User Registered!"});
        }

        private Task<bool> checkEmail(string email)
            => _context.Users.AnyAsync(x => x.Email == email);

        private Task<bool> checkUsername(string username)
            => _context.Users.AnyAsync(x => x.UserName == username);

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("orangefoodseceratkeyfortest");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role , user.Designation),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim("branchId" ,  (user.BranchId).ToString())
            }) ;

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = credentials,
            };
            var token = jwtTokenHandler.CreateToken(tokenDescripter);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
