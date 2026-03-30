using MongoDB.Driver;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;


namespace Portfolio_Ayham.Server.Infrastructure.Repositories
{
    public class PersonalRepository : IPersonalRepository
    {
        private readonly IMongoCollection<Personal> _personals;

        public PersonalRepository(IMongoDatabase database, ILogger<PersonalRepository> logger)
        {
            _personals = database.GetCollection<Personal>("Personals");
        }

        public async Task<Personal> AddAsync(Personal entity)
        {
            await _personals.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _personals.DeleteOneAsync(p => p.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<bool> ExistsAsync(string id)
        {
            return await _personals.Find(p => p.Id == id).AnyAsync();
        }

        public async Task<IEnumerable<Personal>> GetAllAsync()
        {
            return await _personals.Find(_ => true).ToListAsync();
        }

        public async Task<Personal?> GetByIdAsync(string id)
        {
            return await _personals.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Personal?> GetByUserIdAsync(string userId)
        {
            return await _personals.Find(p => p.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<Personal> UpdateAsync(Personal entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _personals.ReplaceOneAsync(p => p.Id == entity.Id, entity);
            if (result.MatchedCount == 0)
            {
                throw new Exception($"Personal with id {entity.Id} not found");
            }
            return entity;
        }
    }
}
