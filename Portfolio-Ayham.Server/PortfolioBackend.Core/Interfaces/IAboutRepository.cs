using portfolio.Server.PortfolioBackend.Core.Repositories;
using portfolio.Server.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Interfaces
{
    public interface IAboutRepository : IRepository<About>
    {
        Task<About?> GetByUserIdAsync(string userId, string language = "en");
    }
}
