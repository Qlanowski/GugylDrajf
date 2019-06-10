using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Helpers
{
    public class AppSettings
    {
        public string JwtKey { get; set; }
        public string BucketName { get; set; }
        public string CognitiveServiceKey { get; set; }
        public string Region { get; set; }
    }
}
