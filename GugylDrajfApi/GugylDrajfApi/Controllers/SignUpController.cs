using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GugylDrajfApi.Models;
using GugylDrajfApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GugylDrajfApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private IUserRepository _repo;

        public SignUpController(IUserRepository repo)
        {
            _repo = repo;
        }
        // GET: api/SignUp
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _repo.GetAllUsers();
        }

        // GET: api/SignUp/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SignUp
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/SignUp/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
