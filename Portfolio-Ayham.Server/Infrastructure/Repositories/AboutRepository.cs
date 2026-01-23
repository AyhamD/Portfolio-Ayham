using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Repositories
{
    public class AboutRepository : IAboutRepository
    {
        private readonly IMongoCollection<About> _abouts;

        public AboutRepository(MongoDbContext context)
        {
            _abouts = context.Abouts;
        }

        public async Task<About> AddAsync(About entity)
        {
            await _abouts.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _abouts.DeleteOneAsync(about => about.Id == id);
            return result.DeletedCount > 0;

        }

        public async Task<bool> ExistsAsync(string id)
        {
            return await _abouts.Find(about => about.Id == id).AnyAsync();
        }

        public async Task<IEnumerable<About>> GetAllAsync()
        {
            return await _abouts.Find(_ => true).ToListAsync();
        }

        public async Task<About?> GetByIdAsync(string id)
        {
            return await _abouts.Find(about => about.Id == id).FirstOrDefaultAsync();
        }

        public async Task<About?> GetByUserIdAsync(string userId)
        {
            return await _abouts.Find(about => about.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<About> UpdateAsync(About entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _abouts.ReplaceOneAsync(about => about.Id == entity.Id, entity);

            if(result.MatchedCount == 0)
            {
                throw new Exception("About entry not found.");
            }
            return entity;
        }
    }
}
