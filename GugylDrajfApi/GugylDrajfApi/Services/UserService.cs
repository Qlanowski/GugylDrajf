using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using GugylDrajfApi.Helpers;
using GugylDrajfApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly ISecretService _secretsService;

        public UserService(IOptions<AppSettings> appSettings, ISecretService secrets)
        {
            _appSettings = appSettings.Value;
            _secretsService = secrets;
        }

        public async Task<string> GenerateToken(string login, string azureId, string email)
        {
            string tokenContent = null;
            try
            {
                var secret = await _secretsService.GetSecret(_appSettings.JWTSecret);
                var key = Encoding.ASCII.GetBytes(secret);
                
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("azureId", azureId),
                        new Claim("login", login),
                        new Claim("email", email),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);

                tokenContent= tokenHandler.WriteToken(token);
            }
            catch(AmazonSecretsManagerException e)
            {
                Console.WriteLine(e.Message);
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return tokenContent;
        }
        private async Task<string> GetKey()
        {
            var request = new GetSecretValueRequest
            {
                SecretId = _appSettings.JWTSecret
            };

            var response = await _secretsService.GetSecretValueAsync(request);
            return response.SecretString;
        }
    }
}