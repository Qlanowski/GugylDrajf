using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GugylDrajfApi.Models;
using GugylDrajfApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GugylDrajfApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate()
        {
            var token = _userService.GenerateToken("karol", "asldkj23jljkads","karol@wp.pl");

            if (token == null)
                return BadRequest(new { message = "Can't authenticate." });

            return Ok(token);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            //User.Claims.FirstOrDefault(c => c.Type == "Currency").Value
            var a = User.Claims;
            return Ok(users);
        }
    }
}