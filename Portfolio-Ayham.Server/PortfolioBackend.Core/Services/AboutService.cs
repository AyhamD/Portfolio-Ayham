using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class AboutService : IAboutService
    {
        private readonly IAboutRepository _aboutRepository;
        private readonly IMapper _mapper;
        private readonly LanguageHelper _LanguageHelper; 

        public AboutService(IAboutRepository aboutRepository, IMapper mapper, LanguageHelper LanguageHelper)
        {
            _aboutRepository = aboutRepository;
            _mapper = mapper;
            _LanguageHelper = LanguageHelper;  
        }

        public async Task<AboutDtos> CreateOrUpdateAboutAsync(CreateAboutDto createAboutDto)
        {
            var existingAbout = await _aboutRepository.GetByUserIdAsync(createAboutDto.userId);
            if (existingAbout != null)
            {
                existingAbout.Summary[createAboutDto.Language] = createAboutDto.Summary; 
                existingAbout.Highlights[createAboutDto.Language] = createAboutDto.Highlights ?? new List<string>();
                if (createAboutDto.Languages != null)
                {
                    existingAbout.Languages = _mapper.Map<List<Language>>(createAboutDto.Languages);
                }
                existingAbout.UpdatedAt = DateTime.UtcNow;
                var updated = await _aboutRepository.UpdateAsync(existingAbout);
                return await GetAboutByUserIdAsync(updated.UserId, createAboutDto.Language);
            }
            else
            {
                var about = new About
                {
                    UserId = createAboutDto.userId,
                    Summary = new Dictionary<string, string> { { createAboutDto.Language, createAboutDto.Summary } },
                    Highlights = new Dictionary<string, List<string>> { { createAboutDto.Language, createAboutDto.Highlights ?? new List<string>() } },
                    Languages = _mapper.Map<List<Language>>(createAboutDto.Languages),
                    CreatedAt = DateTime.UtcNow
                };
                var created = await _aboutRepository.AddAsync(about);
                return await GetAboutByUserIdAsync(created.UserId, createAboutDto.Language);
            }
        }

        public async Task<bool> DeleteAboutAsync(string userId)
        {
            var about = await _aboutRepository.GetByUserIdAsync(userId);
            if (about == null)
            {
                throw new AboutNotFoundException(userId);
            }
            await _aboutRepository.DeleteAsync(about.Id);
            return true;
        }

        public async Task<AboutDtos> GetAboutByUserIdAsync(string userId, string language = "en")
        {
            var about = await _aboutRepository.GetByUserIdAsync(userId);
            if (about == null)
            {
                return new AboutDtos
                {
                    id = string.Empty,
                    userId = string.Empty,
                    Summary = string.Empty,  
                    Highlights = new List<string>(),
                    Languages = new List<LanguageDto>(),
                };
            }

            return new AboutDtos
            {
                id = about.Id,
                userId = about.UserId,
                Summary = _LanguageHelper.GetString(about.Summary, language),
                Highlights = _LanguageHelper.GetList(about.Highlights, language),
                Languages = _mapper.Map<List<LanguageDto>>(about.Languages),
            };
        }
    }
}
