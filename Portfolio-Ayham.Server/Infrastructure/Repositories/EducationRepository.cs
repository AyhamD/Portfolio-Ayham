using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Repositories
{
    public class EducationRepository : IEducationRepository
    {
        private readonly IMongoCollection<Education> _educations;

        public EducationRepository(MongoDbContext context)
        {
            _educations = context.Educations;
        }

        public async Task<Education?> GetByIdAsync(string id)
        {
            return await _educations.Find(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Education>> GetAllAsync()
        {
            return await _educations.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<Education>> GetByUserIdAsync(string userId)
        {
            return await _educations.Find(a => a.UserId == userId).ToListAsync();
        }

        public async Task<Education> AddAsync(Education entity)
        {
            await _educations.InsertOneAsync(entity);
            return entity;
        }

        public async Task<Education> UpdateAsync(Education entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _educations.ReplaceOneAsync(a => a.Id == entity.Id, entity);

            if (result.MatchedCount == 0)
                throw new Exception($"About with id {entity.Id} not found");

            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _educations.DeleteOneAsync(a => a.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<bool> ExistsAsync(string id)
        {
            return await _educations.Find(a => a.Id == id).AnyAsync();
        }
    }
}
