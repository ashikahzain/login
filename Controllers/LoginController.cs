using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using userlogin.Models;
using userlogin.Repository;

namespace userlogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ILoginRepository loginrepo;
        IConfiguration config;

        public LoginController(ILoginRepository loginrepo, IConfiguration config)
        {
            this.loginrepo = loginrepo;
            this.config = config;
        }
        //To get Token
        [AllowAnonymous]
        [HttpGet("{username}/{password}")]
        public IActionResult Login(string username, string password)
        {
            IActionResult response = Unauthorized();
            //Authenticate the user
            var user = AuthenticateUser(username, password);



            //validate
            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new
                {
                    uName = user.Username,
                    token = tokenString
                });
            }
            return response;
        }



        private TblUser AuthenticateUser(string username, string password)
        {
            TblUser user = null;
            user = loginrepo.validateUser(username, password);
            if (user != null)
            {
                return user;
            }
            return user;
        }


        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("getuser/{username}/{password}")]

        public async Task<ActionResult<TblUser>> GetUserbyCredentials(string username, string password)
        {
            try
            {
                var tblUser = await loginrepo.GetUserbyCredentials(username, password);
                if (tblUser == null)
                {
                    return NotFound();
                }
                return tblUser;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private string GenerateJSONWebToken(TblUser user)
        {
            //security key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));



            //signing credential
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);



            //Generate token
            var token = new JwtSecurityToken(
            config["Jwt:Issuer"],
            config["Jwt:Issuer"],
            null,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpGet]

        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await loginrepo.GetUsers();
                if (users == null)
                {
                    return NotFound();
                }
                return Ok(users);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TblUser>> GetUserbyId(int id)
        {

            var result = await loginrepo.GetUserbyId(id);

            if (result == null)
            {
                return null;
            }
            return result;


        }

        [HttpPost]

        public async Task<IActionResult> AddUser([FromBody] TblUser user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var UserId = await loginrepo.AddUser(user);
                    if (UserId > 0)
                    {
                        return Ok(UserId);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    return BadRequest();
                }

            }
            return BadRequest();
        }

    }
}
