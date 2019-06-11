using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public class SecretService : ISecretService
    {
        private readonly IAmazonSecretsManager _secretsManager;

        public SecretService(IAmazonSecretsManager secretsManager)
        {
            _secretsManager = secretsManager;
        }
        public async Task<string> GetSecret(string secretName)
        {
            var request = new GetSecretValueRequest
            {
                SecretId = secretName
            };

            var response = await _secretsManager.GetSecretValueAsync(request);
            return response.SecretString;
        }
    }
}
