using Amazon.S3.Model;
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
        string GetDownloadFileUrl(string azureId, string filename);
        Task<IEnumerable<FileMetadata>> FileNames(string azureId);

        Task<DeleteObjectResponse> DeleteFile(string azureId, string filename);
    }
}
