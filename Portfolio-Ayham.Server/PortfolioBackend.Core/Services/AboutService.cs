using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class AboutService : IAboutService
    {
        private readonly IAboutRepository _aboutRepository;
        private readonly IMapper _mapper;

        public AboutService(IAboutRepository aboutRepository, IMapper mapper)
        {
            _aboutRepository = aboutRepository;
            _mapper = mapper;
        }
        public async Task<AboutDtos> CreateOrUpdateAboutAsync(CreateAboutDto createAboutDto)
        {
            var existingAbout = await _aboutRepository.GetByUserIdAsync(createAboutDto.userId);
            if (existingAbout != null)
            {
                _mapper.Map(createAboutDto, existingAbout);
                existingAbout.UpdatedAt = DateTime.UtcNow;
                var updated = await _aboutRepository.UpdateAsync(existingAbout);
                return _mapper.Map<AboutDtos>(updated);
            }
            else
            {
                var about = _mapper.Map<About>(createAboutDto);
                var created = await _aboutRepository.AddAsync(about);
                return _mapper.Map<AboutDtos>(created);
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

        public async Task<AboutDtos> GetAboutByUserIdAsync(string userId)
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

            return _mapper.Map<AboutDtos>(about);
        }
    }
}
