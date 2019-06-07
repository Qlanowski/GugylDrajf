using GugylDrajfApi.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public interface IS3Service
    {
        Task<S3Response> UploadFileToS3(string azureId, IFormFile file);

    }
}
