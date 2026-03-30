using portfolio.Server.PortfolioBackend.Core.Repositories;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Interfaces
{
    public interface IExperienceRepository : IRepository<Experience>
    {
        Task<IEnumerable<Experience>> GetByUserIdAsync(string userId);
    }
}
