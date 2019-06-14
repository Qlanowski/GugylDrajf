using GugylDrajfApi.Helpers;
using GugylDrajfApi.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ApiTests
{
    public class UserServiceTests
    {
        [Fact]
        public void TokenGenerated()
        {
            string login = "someLogin";
            string azureId = "someAzureId";
            string email = "email";

            var appSettings = new AppSettings()
            {
                JwtKey = "SomeKey",
            };
            var options = Microsoft.Extensions.Options.Options.Create<AppSettings>(appSettings);
            Mock<ISecretService> secretsService = new Mock<ISecretService>();
            secretsService.Setup(m => m.GetSecret(It.IsAny<string>())).ReturnsAsync("someSecret");
            var service = new UserService(options, secretsService.Object);

            Assert.NotNull(service.GenerateToken(login,azureId,email).GetAwaiter().GetResult());
        }

        [Fact]
        public void NullParametersOnTokenGenerateThrowException()
        {
            string login = "";
            string azureId = "";
            string email = "";

            var appSettings = new AppSettings()
            {
                JwtKey = "SomeKey",
            };
            var options = Microsoft.Extensions.Options.Options.Create<AppSettings>(appSettings);
            Mock<ISecretService> secretsService = new Mock<ISecretService>();
            secretsService.Setup(m => m.GetSecret(It.IsAny<string>())).ReturnsAsync("someSecret");
            var service = new UserService(options, secretsService.Object);

            Assert.Throws<ArgumentException>(() =>(service.GenerateToken(login, azureId, email).GetAwaiter().GetResult()));
        }
    }
}
