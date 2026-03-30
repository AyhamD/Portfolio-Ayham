using Microsoft.EntityFrameworkCore;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Infrastructure.Repositories
{
    internal class TranslationRepository(DataContext dataContext) : ITranslationRepository
    {
        public async Task<IEnumerable<Translation>> GetAllAsync()
        {
            return await dataContext.Translations.ToListAsync();
        }

        public async Task<Translation?> GetByKeyAsync(string language, string key)
        {
            return await dataContext.Translations.FindAsync(language, key);
        }

        public void Insert(Translation translation)
        {
            dataContext.Translations.Add(translation);
        }

        public void Update(Translation translation)
        {
            dataContext.Entry(translation).State = EntityState.Modified;
        }

        public void Remove(Translation translation)
        {
            dataContext.Translations.Remove(translation);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await dataContext.SaveChangesAsync();
        }
    }
}
