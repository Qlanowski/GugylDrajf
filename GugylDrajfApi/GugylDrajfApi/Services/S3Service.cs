using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using GugylDrajfApi.Helpers;
using GugylDrajfApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public class S3Service:IS3Service
    {
        private readonly IAmazonS3 _client;
        private readonly AppSettings _appSettings;

        public S3Service(IAmazonS3 client, IOptions<AppSettings> appSettings)
        {
            _client = client;
            _appSettings = appSettings.Value;
        }

        public async Task<S3Response> UploadFileToS3(string azureId,IFormFile file)
        {
            try
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    file.CopyTo(newMemoryStream);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = newMemoryStream,
                        Key = $"{azureId}/{file.FileName}",
                        BucketName = _appSettings.BucketName,
                        CannedACL = S3CannedACL.Private
                    };

                    var fileTransferUtility = new TransferUtility(_client);
                    await fileTransferUtility.UploadAsync(uploadRequest);
                }
                return new S3Response(HttpStatusCode.OK);
            }
            catch(AmazonS3Exception e)
            {
                return new S3Response(e.StatusCode,e.Message);
            }
            catch (Exception e)
            {
                return new S3Response(HttpStatusCode.InternalServerError, e.Message);
            }
        }

    }
}
