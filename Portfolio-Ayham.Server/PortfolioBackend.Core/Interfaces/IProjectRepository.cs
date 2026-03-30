using portfolio.Server.PortfolioBackend.Core.Repositories;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<IEnumerable<Project>> GetByUserIdAsync(string userId);
    }
}
