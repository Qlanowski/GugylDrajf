using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using GugylDrajfApi.Helpers;
using GugylDrajfApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<(MemoryStream stream,string contentType)> DownloadFile(string azureId, string filename)
        {
            try
            {
                var request = new GetObjectRequest
                {
                    BucketName = _appSettings.BucketName,
                    Key = $"{azureId}/{filename}"
                };
                var memory = new MemoryStream();
                using (var response = await _client.GetObjectAsync(request))
                using (var responseStream = response.ResponseStream)
                using (var reader =  new StreamReader(responseStream))
                {
                    string contentType = response.Headers["Content-Type"];
                    await responseStream.CopyToAsync(memory);
                    return (memory,contentType);
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return (null,null);
        }

        public async Task<IEnumerable<string>> FileNames(string azureId)
        {
            var names = new List<string>();
            ListObjectsV2Request lor = new ListObjectsV2Request()
            {
                BucketName = _appSettings.BucketName,
                Prefix = azureId + "/"
            };
            var objectListing = await _client.ListObjectsV2Async(lor);
            foreach (var obj in objectListing.S3Objects)
            {
                names.Add(obj.Key.Split("/")[1]);
            }
            return names;
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
