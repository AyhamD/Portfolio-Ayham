using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Repositories
{
    public interface IRepository<T> where T : BaseModels
    {
        Task<T?> GetByIdAsync(string id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<bool> DeleteAsync(string id);
        Task<bool> ExistsAsync(string id);
    }
}
