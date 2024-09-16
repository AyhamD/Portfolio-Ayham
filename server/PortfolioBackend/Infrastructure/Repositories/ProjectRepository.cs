using Microsoft.EntityFrameworkCore;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Infrastructure.Repositories
{
    internal class ProjectRepository(DataContext DataContext) : IProjectRepository
    {
        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await DataContext.Projects.Include(p => p.Competencies).ToListAsync();
        }

        public async Task<Project> GetByIdAsync(Guid projectId)
        {
            return await DataContext.Projects.Include(p => p.Competencies).FirstOrDefaultAsync(p => p.Id == projectId);
        }

        public void Insert(Project project)
        {
            DataContext.Projects.Add(project);
        }

        public void Update(Project project)
        {
            DataContext.Projects.Update(project);
        }

        public void Remove(Project project)
        {
            DataContext.Projects.Remove(project);
        }
        public async Task<int> SaveChangesAsync()
        {
            return await DataContext.SaveChangesAsync();
        }
    }
}
