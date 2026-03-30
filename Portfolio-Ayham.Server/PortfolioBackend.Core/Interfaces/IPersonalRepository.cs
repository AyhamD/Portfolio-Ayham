using portfolio.Server.PortfolioBackend.Core.Repositories;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Interfaces
{
    public interface IPersonalRepository : IRepository<Personal>
    {
        Task<Personal?> GetByUserIdAsync(string userId);
    }
}
