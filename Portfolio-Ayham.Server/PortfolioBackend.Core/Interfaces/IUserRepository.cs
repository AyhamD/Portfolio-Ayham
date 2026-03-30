using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByNameAsync(string name);
        Task<bool> UserExistsAsync(string email);
    }
}
