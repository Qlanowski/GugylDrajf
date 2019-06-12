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
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _client;
        private readonly AppSettings _appSettings;

        public S3Service(IAmazonS3 client, IOptions<AppSettings> appSettings)
        {
            _client = client;
            _appSettings = appSettings.Value;
        }

        public string GetDownloadFileUrl(string azureId, string filename)
        {
            string urlString = "";
            try
            {
                GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
                {
                    BucketName = _appSettings.BucketName,
                    Key = $"{azureId}/{filename}",
                    Expires = DateTime.Now.AddMinutes(5)
                };
                urlString = _client.GetPreSignedURL(request);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            return urlString;
        }

        public async Task<DeleteObjectResponse> DeleteFile(string azureId, string filename)
        {
            var deleteObjectRequest = new DeleteObjectRequest
            {
                BucketName = _appSettings.BucketName,
                Key = $"{azureId}/{filename}",
            };

            Console.WriteLine("Deleting an object");
            return await _client.DeleteObjectAsync(deleteObjectRequest);
        }

        public async Task<IEnumerable<FileMetadata>> FileNames(string azureId)
        {
            var names = new List<FileMetadata>();
            ListObjectsV2Request lor = new ListObjectsV2Request()
            {
                BucketName = _appSettings.BucketName,
                Prefix = azureId + "/"
            };
            var objectListing = await _client.ListObjectsV2Async(lor);
            foreach (var obj in objectListing.S3Objects)
            {
                var name = obj.Key.Split("/")[1];
                var lastModified = obj.LastModified;
                var isArchieved = obj.StorageClass.Value == "STANDARD" ? false : true;
                names.Add(new FileMetadata(name, lastModified, isArchieved));
            }
            return names;
        }

        public async Task<S3Response> UploadFileToS3(string azureId, IFormFile file)
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
            catch (AmazonS3Exception e)
            {
                return new S3Response(e.StatusCode, e.Message);
            }
            catch (Exception e)
            {
                return new S3Response(HttpStatusCode.InternalServerError, e.Message);
            }
        }

    }
}
