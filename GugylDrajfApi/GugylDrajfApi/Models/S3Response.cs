using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GugylDrajfApi.Models
{
    public class S3Response
    {
        public S3Response(HttpStatusCode status, string message = null)
        {
            Status = status;
            Message = message;
        }

        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
    }
}
