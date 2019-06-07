using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using GugylDrajfApi.Models;
using Microsoft.AspNetCore.Http;
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
        //TODO: move to settings
        private readonly string bucketName = "gugyldrajf-files";
        private readonly IAmazonS3 _client;

        public S3Service(IAmazonS3 client)
        {
            _client = client;
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
                        BucketName = bucketName,
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
