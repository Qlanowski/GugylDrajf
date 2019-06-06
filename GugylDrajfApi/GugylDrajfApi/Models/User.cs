using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Models
{
    [DynamoDBTable("UsersGugylDrajfDb")]
    public class User
    {
        [DynamoDBHashKey]
        public string Login { get; set; }
        public string AzureId { get; set; }
        public string Email { get; set; }
    }
}
