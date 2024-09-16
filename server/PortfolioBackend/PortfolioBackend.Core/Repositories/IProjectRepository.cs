using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project> GetByIdAsync(Guid projectId);
        void Insert(Project project);
        void Update(Project project);
        void Remove(Project project);
        Task<int> SaveChangesAsync();

    }
}
