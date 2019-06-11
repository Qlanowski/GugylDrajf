using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public interface ISecretService
    {
        Task<string> GetSecret(string secretName);
    }
}
