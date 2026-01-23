using portfolio.Server.PortfolioBackend.Core.Repositories;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Interfaces
{
    public interface ISkillRepository : IRepository<Skill>
    {
        Task<IEnumerable<Skill>> GetByUserIdAsync(string userId);
    }
}
