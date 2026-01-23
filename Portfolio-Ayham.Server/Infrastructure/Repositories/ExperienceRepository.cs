using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Repositories
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly IMongoCollection<Experience> _experience;

        public ExperienceRepository(MongoDbContext context)
        {
            _experience = context.Experiences;
        }

        public async Task<Experience?> GetByIdAsync(string id)
        {
            return await _experience.Find(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Experience>> GetAllAsync()
        {
            return await _experience.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<Experience>> GetByUserIdAsync(string userId)
        {
            return await _experience.Find(a => a.UserId == userId).ToListAsync();
        }

        public async Task<Experience> AddAsync(Experience entity)
        {
            await _experience.InsertOneAsync(entity);
            return entity;
        }

        public async Task<Experience> UpdateAsync(Experience entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _experience.ReplaceOneAsync(a => a.Id == entity.Id, entity);

            if (result.MatchedCount == 0)
                throw new Exception($"About with id {entity.Id} not found");

            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _experience.DeleteOneAsync(a => a.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<bool> ExistsAsync(string id)
        {
            return await _experience.Find(a => a.Id == id).AnyAsync();
        }
    }
}
