using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class TranslationService(ITranslationRepository translationRepository) : ITranslationService
    {
        private static readonly HashSet<string> AllowedLanguages = new() { "en", "sv" };

        public async Task<Translation> CreateAsync(TranslationDto translationDto)
        {
            ValidateLanguage(translationDto.Language);

            var existingTranslation = await translationRepository.GetByKeyAsync(translationDto.Language, translationDto.Key);
            if (existingTranslation != null)
            {
                throw new TranslationAlreadyExistsException(translationDto.Language, translationDto.Key);
            }

            var translation = new Translation
            {
                Language = translationDto.Language,
                Key = translationDto.Key,
                Value = translationDto.Value
            };

            translationRepository.Insert(translation);
            await translationRepository.SaveChangesAsync();

            return translation;
        }

        public async Task DeleteAsync(string language, string key)
        {
            var translation = await translationRepository.GetByKeyAsync(language, key);
            if (translation == null)
            {
                throw new TranslationNotFoundException(language, key);
            }

            translationRepository.Remove(translation);
            await translationRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Translation>> GetAllAsync()
        {
            return await translationRepository.GetAllAsync();
        }

        public async Task<Translation> GetByKeyAsync(string language, string key)
        {
            var translation = await translationRepository.GetByKeyAsync(language, key);
            if (translation == null)
            {
                throw new TranslationNotFoundException(language, key);
            }

            return translation;
        }

        public async Task UpdateAsync(string language, string key, TranslationDto translationDto)
        {
            ValidateLanguage(translationDto.Language);

            var translation = await translationRepository.GetByKeyAsync(language, key);
            if (translation == null)
            {
                throw new TranslationNotFoundException(language, key);
            }

            translation.Value = translationDto.Value;
            translationRepository.Update(translation);
            await translationRepository.SaveChangesAsync();
        }

        private static void ValidateLanguage(string language)
        {
            if (!AllowedLanguages.Contains(language.ToLower()))
            {
                throw new InvalidLanguageException(language);
            }
        }
    }
}
