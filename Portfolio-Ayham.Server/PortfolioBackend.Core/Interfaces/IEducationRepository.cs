using portfolio.Server.PortfolioBackend.Core.Repositories;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Interfaces
{
    public interface IEducationRepository : IRepository<Education>
    {
        Task<IEnumerable<Education>> GetByUserIdAsync(string userId);
    }
}
