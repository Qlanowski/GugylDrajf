using GugylDrajfApi.Models;
using GugylDrajfApi.Repositories;
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
    public class SignUpController : ControllerBase
    {
        private IUserRepository _repo;
        private static IConfiguration _config;

        public SignUpController(IUserRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        // GET: api/SignUp
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _repo.GetAllUsers();
        }

        // POST: api/SignUp
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }

        // POST: api/SignUp/login/email
        [HttpPost("{login}/{email}")]
        public async Task<IActionResult> Post(string login, string email)
        {
            var files = Request.Form.Files;
            if (files.Count != 3)
                return BadRequest();

            var users = await _repo.GetAllUsers();
            var azureId = users.Where(u => u.Login == login)?.Select(u => u.AzureId).FirstOrDefault();
            if (azureId == null)
            {
                azureId = await CreateProfile();
                if (azureId == null)
                    return BadRequest();

                users.Append(new User()
                {
                    AzureId = azureId,
                    Login = login,
                    Email = email
                });
            }

            foreach (var file in files)
            {
                CreateEnrollment(azureId, file);
            }

            return Ok();
        }

        static async Task<string> CreateProfile()
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            string azureKey = _config["CognitiveServiceKey"];
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", azureKey);

            var uri = "https://westus.api.cognitive.microsoft.com/spid/v1.0/verificationProfiles?" + queryString;

            HttpResponseMessage response;

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes("{\"locale\":\"en-us\"}");

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PostAsync(uri, content);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    dynamic responseJson = JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                    return responseJson.identificationProfileId;
                }
                return null;
            }
        }

        static async void CreateEnrollment(string identificationProfileId, IFormFile audioFile)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            string azureKey = _config["CognitiveServiceKey"];
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", azureKey);

            // Request parameters
            queryString["shortAudio"] = "true";
            var uri = $"https://westus.api.cognitive.microsoft.com/spid/v1.0/identificationProfiles/{identificationProfileId}/enroll?" + queryString;

            HttpResponseMessage response;

            // Request body
            // TU JAKOS PLIK TRZEBEA DODAC?
            byte[] byteData;
            using (var br = new BinaryReader(audioFile.OpenReadStream()))
            {
                byteData = br.ReadBytes((int)audioFile.OpenReadStream().Length);
            }
            //byte[] byteData = Encoding.UTF8.GetBytes;

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("multipart/form-data"); // A TU JAKIS TYP
                response = await client.PostAsync(uri, content);
            }

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
