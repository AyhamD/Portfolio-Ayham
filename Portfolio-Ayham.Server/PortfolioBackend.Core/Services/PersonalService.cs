using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Repositories;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Dto;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Services.Interfaces;
using Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper;

namespace Portfolio_Ayham.Server.PortfolioBackend.Core.Services
{
    public class PersonalService : IPersonalService
    {
        private readonly IMapper _mapper;
        private readonly IPersonalRepository _personalRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<PersonalService> _logger;
        private readonly LanguageHelper _languageHelper;

        public PersonalService(
            IMapper mapper,
            IPersonalRepository personalRepository,
            IUserRepository userRepository,
            ILogger<PersonalService> logger,
            LanguageHelper languageHelper)
        {
            _mapper = mapper;
            _personalRepository = personalRepository;
            _userRepository = userRepository;
            _logger = logger;
            _languageHelper = languageHelper;
        }
        public async Task<PersonalDtos> GetPersonalByUserIdAsync(string userId, string language = "en")
        {
            try
            {
                var personal = await _personalRepository.GetByUserIdAsync(userId);
                if (personal == null)
                {
                    // Create default personal info if it doesn't exist
                    personal = new Personal
                    {
                        UserId = userId,
                        Name = "",
                        Email = "",
                        PhoneNumber = "",
                        Address = "",
                        Location = "",
                        Title = "",
                        Summary = "",
                        Tagline = new Dictionary<string, string>(),
                    };

                    await _personalRepository.AddAsync(personal);
                }
                return MapPersonalToDto(personal, language);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting personal info for user {UserId}", userId);
                throw;
            }
        }

        public async Task<PersonalDtos> UpdatePersonalAsync(string userId, CreatePersonalDto updatePersonalDto)
        {
            try
            {
                var personal = await _personalRepository.GetByUserIdAsync(userId);

                if (personal == null)
                {
                    // Create new personal info
                    personal = _mapper.Map<Personal>(updatePersonalDto);
                    personal.UserId = userId;
                    personal.Tagline = new Dictionary<string, string>();
                    await _personalRepository.AddAsync(personal);
                }
                else
                {
                    // Update existing personal info
                    _mapper.Map(updatePersonalDto, personal);
                    if (personal.Tagline == null)
                    {
                        personal.Tagline = new Dictionary<string, string>();
                    }

                    var langKey = string.IsNullOrWhiteSpace(updatePersonalDto.Language)
                        ? "en"
                        : updatePersonalDto.Language;

                    personal.Tagline[langKey] = updatePersonalDto.Tagline ?? string.Empty;
                    personal.UpdatedAt = DateTime.UtcNow;
                    await _personalRepository.UpdateAsync(personal);
                }

                return MapPersonalToDto(personal, updatePersonalDto.Language ?? "en");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating personal info for user {UserId}", userId);
                throw;
            }
        }

        private PersonalDtos MapPersonalToDto(Personal personal, string language)
        {
            var dto = _mapper.Map<PersonalDtos>(personal);

            if (personal.Tagline != null && personal.Tagline.Count > 0)
            {
                dto.Tagline = _languageHelper.GetString(personal.Tagline, language);
            }
            else
            {
                dto.Tagline = string.Empty;
            }

            return dto;
        }
    }
}
