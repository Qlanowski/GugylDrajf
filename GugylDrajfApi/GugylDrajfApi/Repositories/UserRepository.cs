using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using GugylDrajfApi.Models;

namespace GugylDrajfApi.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly DynamoDBContext _ctx;

        public UserRepository(IAmazonDynamoDB db)
        {
            _ctx = new DynamoDBContext(db);
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _ctx.ScanAsync<User>(new List<ScanCondition>()).GetRemainingAsync();
            return users;
        }

        public async void AddUser(User user)
        {
            await _ctx.SaveAsync(user);
        }
    }
}
