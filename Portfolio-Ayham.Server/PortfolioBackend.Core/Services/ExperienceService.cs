using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class ExperienceService : IExperienceService
    {
        private readonly IExperienceRepository _experienceRepository;
        private readonly IMapper _mapper;
        private readonly LanguageHelper _languageHelper;

        public ExperienceService(IExperienceRepository experienceRepository, IMapper mapper, LanguageHelper languageHelper)
        {
            _experienceRepository = experienceRepository;
            _mapper = mapper;
            _languageHelper = languageHelper;
        }
        public async Task<ExperienceDtos> CreateExperienceAsync(CreateExperienceDto createExperienceDto)
        {
            var experience = _mapper.Map<Experience>(createExperienceDto);

            // Initialize description dictionary for the provided language
            experience.Description = new Dictionary<string, string>
            {
                { createExperienceDto.Language ?? "en", createExperienceDto.Description ?? string.Empty }
            };

            // Parse dates from string DTO fields
            if (!DateTime.TryParse(createExperienceDto.StartDate, out var startDate))
            {
                throw new ApplicationException("Invalid start date format.");
            }
            experience.StartDate = startDate;

            if (!string.IsNullOrWhiteSpace(createExperienceDto.EndDate))
            {
                if (!DateTime.TryParse(createExperienceDto.EndDate, out var endDate))
                {
                    throw new ApplicationException("Invalid end date format.");
                }
                experience.EndDate = endDate;
            }
            else
            {
                experience.EndDate = null;
            }

            if (experience.EndDate != null && experience.EndDate < experience.StartDate)
            {
                throw new ApplicationException("End date cannot be earlier than start date.");
            }

            experience.CreatedAt = DateTime.UtcNow;
            experience.UpdatedAt = null;
            var createdExperience = await _experienceRepository.AddAsync(experience);
            return MapExperienceToDto(createdExperience, createExperienceDto.Language);
        }

        public async Task<bool> DeleteExperienceAsync(string id)
        {
            var experience = await _experienceRepository.GetByIdAsync(id);
            if (experience == null)
            {
                throw new ApplicationException("Experience entry not found.");
            }
            var result = await _experienceRepository.DeleteAsync(id);
            return result;
        }

        public async Task<ExperienceDtos> GetExperienceByIdAsync(string experienceId)
        {
            var experience = await _experienceRepository.GetByIdAsync(experienceId);
            if (experience == null)
            {
                throw new ApplicationException("Experience entry not found.");
            }
            return _mapper.Map<ExperienceDtos>(experience);
        }

        public async Task<IEnumerable<ExperienceDtos>> GetExperiencesByUserIdAsync(string userId, string language = "en")
        {
            var experiences = await _experienceRepository.GetByUserIdAsync(userId);
            if (experiences == null || !experiences.Any())
            {
                // Return empty list instead of throwing so API can respond with 200 and []
                return Enumerable.Empty<ExperienceDtos>();
            }

            return experiences
                .Select(e => MapExperienceToDto(e, language))
                .OrderBy(e => e.Order);
        }

        public async Task<bool> UpdateExperienceAsync(string id, CreateExperienceDto updateExperienceDto)
        {
            var existingExperience = await _experienceRepository.GetByIdAsync(id);
            if (existingExperience == null)
            {
                throw new ApplicationException("Experience entry not found.");
            }
            // Parse and update dates from DTO
            if (!DateTime.TryParse(updateExperienceDto.StartDate, out var startDate))
            {
                throw new ApplicationException("Invalid start date format.");
            }
            existingExperience.StartDate = startDate;

            if (!string.IsNullOrWhiteSpace(updateExperienceDto.EndDate))
            {
                if (!DateTime.TryParse(updateExperienceDto.EndDate, out var endDate))
                {
                    throw new ApplicationException("Invalid end date format.");
                }
                existingExperience.EndDate = endDate;
            }
            else
            {
                existingExperience.EndDate = null;
            }

            if (existingExperience.EndDate != null && existingExperience.EndDate < existingExperience.StartDate)
            {
                throw new ApplicationException("End date cannot be earlier than start date.");
            }

            existingExperience.UpdatedAt = DateTime.UtcNow;
            _mapper.Map(updateExperienceDto, existingExperience);

            if (existingExperience.Description == null)
            {
                existingExperience.Description = new Dictionary<string, string>();
            }

            var languageKey = updateExperienceDto.Language ?? "en";
            existingExperience.Description[languageKey] = updateExperienceDto.Description ?? string.Empty;
            var updated = await _experienceRepository.UpdateAsync(existingExperience);
            return true;
        }

        private ExperienceDtos MapExperienceToDto(Experience experience, string? language)
        {
            var dto = _mapper.Map<ExperienceDtos>(experience);
            var lang = string.IsNullOrWhiteSpace(language) ? "en" : language;
            dto.Description = _languageHelper.GetString(experience.Description, lang);
            return dto;
        }
    }
}
