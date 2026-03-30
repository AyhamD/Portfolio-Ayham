using MongoDB.Driver;
using portfolio.Server.PortfolioBackend.Core.Repositories;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(Data.MongoDbContext context, ILogger<UserRepository> logger)
        {
            _users = context.Users;
            _logger = logger;
        }
        public async Task<User> AddAsync(User entity)
        {
            await _users.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            await _users.DeleteOneAsync(u => u.Id == id);
            return true;
        }

        public async Task<bool> ExistsAsync(string id)
        {
            await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
            return true;
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            return Task.FromResult(_users.Find(_ => true).ToEnumerable().AsEnumerable());
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByNameAsync(string name)
        {
            return await _users.Find(u => u.Name == name).FirstOrDefaultAsync();
        }

        public async Task<User> UpdateAsync(User entity)
        {
            entity.ModifiedDate = DateTime.UtcNow;
            entity.UpdatedAt = DateTime.UtcNow;

            var result = await _users.ReplaceOneAsync(u => u.Id == entity.Id, entity);
            if(result.IsAcknowledged)
            {
                return entity;
            }
            return entity;
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _users.Find(u => u.Email == email).AnyAsync();
        }
    }
}
