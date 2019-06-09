using GugylDrajfApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GugylDrajfApi.Services
{
    public interface IUserService
    {
        string Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }
}
