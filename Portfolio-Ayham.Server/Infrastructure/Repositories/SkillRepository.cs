using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Repositories
{
    public class SkillRepository : ISkillRepository
    {
        private readonly IMongoCollection<Skill> _skill;

        public SkillRepository(MongoDbContext context)
        {
            _skill = context.Skills;
        }

        public async Task<Skill?> GetByIdAsync(string id)
        {
            return await _skill.Find(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            return await _skill.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<Skill>> GetByUserIdAsync(string userId)
        {
            return await _skill.Find(a => a.UserId == userId).ToListAsync();
        }

        public async Task<Skill> AddAsync(Skill entity)
        {
            await _skill.InsertOneAsync(entity);
            return entity;
        }

        public async Task<Skill> UpdateAsync(Skill entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _skill.ReplaceOneAsync(a => a.Id == entity.Id, entity);

            if (result.MatchedCount == 0)
                throw new Exception($"About with id {entity.Id} not found");

            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _skill.DeleteOneAsync(a => a.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<bool> ExistsAsync(string id)
        {
            return await _skill.Find(a => a.Id == id).AnyAsync();
        }
    }
}
