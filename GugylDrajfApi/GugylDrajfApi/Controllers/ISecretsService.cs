using System.Threading.Tasks;

namespace GugylDrajfApi.Controllers
{
    public interface ISecretsService
    {
        Task<string> GetSecret(string secretName);
    }
}