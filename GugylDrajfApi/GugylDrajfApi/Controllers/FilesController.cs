using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GugylDrajfApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GugylDrajfApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IS3Service _service;

        public FilesController(IS3Service service)
        {
            _service = service;
        }
        
        [HttpPost]
        public async Task<IActionResult> Upload()
        {
            try
            {
                //azureId
                var azureId = "demouser";
                IFormFile file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                   var response = await _service.UploadFileToS3(azureId,file);
                   return StatusCode((int)response.Status);
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
