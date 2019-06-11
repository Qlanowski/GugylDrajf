using GugylDrajfApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public interface IS3Service
    {
        Task<S3Response> UploadFileToS3(string azureId, IFormFile file);
        Task<(MemoryStream stream, string contentType)> DownloadFile(string azureId, string filename);
        string GetDownloadFileUrl(string azureId, string filename);
        Task<IEnumerable<string>> FileNames(string azureId);
    }
}
