using GugylDrajfApi.Models;
using GugylDrajfApi.Repositories;
using GugylDrajfApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace GugylDrajfApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserRepository _repo;
        private static IConfiguration _config;
        private static IUserService _userService;

        public LoginController(IUserRepository repo, IConfiguration config, IUserService userService)
        {
            _repo = repo;
            _config = config;
            _userService = userService;
        }

        // POST: api/Login/login
        [HttpPost("{login}")]
        public async Task<IActionResult> Post(string login)
        {
            var files = Request.Form.Files;
            if (files.Count != 1)
                return BadRequest();

            var user = (await _repo.GetAllUsers()).Where(u => u.Login == login).FirstOrDefault();

            if (user == null)
            {
                return BadRequest("User doesn't exists");
            }

            var response = await Verify(user.AzureId, files[0]);
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode);

            dynamic responseJson = JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
            if (responseJson.result == false)
                return BadRequest("It is not you, you liar!");

            var token = _userService.GenerateToken(user.Login, user.AzureId, user.Email);
            return Ok(token);
        }

        // POST: api/Login/tokendebug/login
        [HttpPost("tokendebug/{login}")]
        public async Task<IActionResult> GetTokenDebug(string login)
        {
            var files = Request.Form.Files;
            if (files.Count != 1)
                return BadRequest();

            var user = (await _repo.GetAllUsers()).Where(u => u.Login == login).FirstOrDefault();

            if (user == null)
            {
                return BadRequest("User doesn't exists");
            }

            var token = _userService.GenerateToken(user.Login, user.AzureId, user.Email);
            return Ok(token);
        }

        private async Task<HttpResponseMessage> Verify(string verificationProfileId, IFormFile audioFile)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            string azureKey = _config["CognitiveServiceKey"];
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", azureKey);

            var uri = $"https://westus.api.cognitive.microsoft.com/spid/v1.0/verify?verificationProfileId={verificationProfileId}&" + queryString;

            HttpResponseMessage response;

            // Request body
            byte[] convertedWav;
            using (var br = new BinaryReader(audioFile.OpenReadStream()))
            {
                var rawData = br.ReadBytes((int)audioFile.OpenReadStream().Length);
                convertedWav = WavConverter.ConvertToAzureWav(rawData);
            }

            using (var content = new ByteArrayContent(convertedWav))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("multipart/form-data");
                response = await client.PostAsync(uri, content);
                return response;
            }
        }
    }
}