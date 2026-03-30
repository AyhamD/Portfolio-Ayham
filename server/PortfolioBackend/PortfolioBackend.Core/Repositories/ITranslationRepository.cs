using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Repositories
{
    public interface ITranslationRepository
    {
        Task<IEnumerable<Translation>> GetAllAsync();
        Task<Translation?> GetByKeyAsync(string language, string key);
        void Insert(Translation translation);
        void Update(Translation translation);
        void Remove(Translation translation);
        Task<int> SaveChangesAsync();
    }
}
