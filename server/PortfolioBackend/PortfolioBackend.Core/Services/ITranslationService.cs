using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    public interface ITranslationService
    {
        Task<IEnumerable<Translation>> GetAllAsync();
        Task<Translation> GetByKeyAsync(string language, string key);
        Task<Translation> CreateAsync(TranslationDto translationDto);
        Task UpdateAsync(string language, string key, TranslationDto translationDto);
        Task DeleteAsync(string language, string key);
    }
}
