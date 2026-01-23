using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IMongoCollection<Project> _projects;
        public ProjectRepository(MongoDbContext context)
        {
            _projects = context.Projects;
        }
        public async Task<Project> AddAsync(Project entity)
        {
           await _projects.InsertOneAsync(entity).ContinueWith(t => entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _projects.DeleteOneAsync(p => p.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<bool> ExistsAsync(string id)
        {
            return await _projects.Find(p => p.Id == id).AnyAsync();
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await _projects.Find(_ => true).ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(string id)
        {
            return await _projects.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Project>> GetByUserIdAsync(string userId)
        {
            return await _projects.Find(p => p.UserId == userId).ToListAsync();
        }

        public async Task<Project> UpdateAsync(Project entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var result = await _projects.ReplaceOneAsync(p => p.Id == entity.Id, entity);
            
            if (result.MatchedCount == 0)
            {
                throw new Exception("Project entry not found.");
            }
            return entity;
        }
    }
}
