using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GugylDrajfApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GugylDrajfApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IS3Service _service;

        public FilesController(IS3Service service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("names")]
        public async Task<IActionResult> GetAllNames()
        {
            var azureId = User.Claims.FirstOrDefault(c => c.Type == "azureId").Value;
            var files = await _service.FileNames(azureId);
            return Ok(files);
        }

        [HttpGet]
        [Route("{filename}")]
        public string GetDownloadFileUrl(string filename)
        {
            var azureId = User.Claims.FirstOrDefault(c => c.Type == "azureId").Value;
            return _service.GetDownloadFileUrl(azureId, filename);
        }
        
        [HttpDelete]
        [Route("delete/{filename}")]
        public async Task<IActionResult> DeleteFile(string filename)
        {
            var azureId = User.Claims.FirstOrDefault(c => c.Type == "azureId").Value;
            var response = await _service.DeleteFile(azureId, filename);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var azureId = User.Claims.FirstOrDefault(c=>c.Type=="azureId").Value;
                IFormFile file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                   var response = await _service.UploadFileToS3(azureId,file);
                   return StatusCode((int)response.Status, new { Filename = file.FileName });
                }
                return BadRequest();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(500);
            }
   
        }

    }
}
