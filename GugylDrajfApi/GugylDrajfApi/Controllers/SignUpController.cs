using GugylDrajfApi.Helpers;
using GugylDrajfApi.Models;
using GugylDrajfApi.Repositories;
using GugylDrajfApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NAudio.Wave;
using NAudio.Wave.SampleProviders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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
        private readonly IUserRepository _repo;
        private readonly AppSettings _appSettings;
        private readonly ISecretService _secretService;

        public SignUpController(IUserRepository repo, IOptions<AppSettings> appSettings,ISecretService secretService)
        {
            _repo = repo;
            _appSettings = appSettings.Value;
            _secretService = secretService;
        }

        // GET: api/SignUp
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _repo.GetAllUsers();
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

                _repo.AddUser(new User()
                {
                    AzureId = azureId,
                    Login = login,
                    Email = email
                });
            }

            foreach (var file in files)
            {
                var response = await CreateEnrollment(azureId, file);
                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode);
            }

            return Ok();
        }

        private async Task<string> CreateProfile()
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            string azureKey = await _secretService.GetSecret(_appSettings.CognitiveServiceKey); //_config["CognitiveServiceKey"];
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
                    return responseJson.verificationProfileId;
                }
                return null;
            }
        }

        private async Task<HttpResponseMessage> CreateEnrollment(string identificationProfileId, IFormFile audioFile)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            string azureKey = await _secretService.GetSecret(_appSettings.CognitiveServiceKey);
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", azureKey);

            // Request parameters
            queryString["shortAudio"] = "true";
            var uri = $"https://westus.api.cognitive.microsoft.com/spid/v1.0/identificationProfiles/{identificationProfileId}/enroll?" + queryString;

            HttpResponseMessage response;

            // Request body
            byte[] convertedWav;
            using (var br = new BinaryReader(audioFile.OpenReadStream()))
            {
                var rawData = br.ReadBytes((int)audioFile.OpenReadStream().Length);
                convertedWav = WavConverter.ConvertToAzureWav(rawData);
            }
            //byte[] byteData = Encoding.UTF8.GetBytes;

            using (var content = new ByteArrayContent(convertedWav))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("multipart/form-data");
                response = await client.PostAsync(uri, content);
                // DEBUG - uncomment for better json reading feeling
                // dynamic responseJson = JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                return response;
            }

        }
    }
}
