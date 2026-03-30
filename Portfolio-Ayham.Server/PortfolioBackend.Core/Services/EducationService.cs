using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper;
using System.Collections.Generic;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class EducationService : IEducationService
    {
        private readonly IEducationRepository _educationRepository;
        private readonly IMapper _mapper;
        private readonly LanguageHelper _languageHelper;

        public EducationService(IEducationRepository educationRepository, IMapper mapper, LanguageHelper languageHelper)
        {
            _educationRepository = educationRepository;
            _mapper = mapper;
            _languageHelper = languageHelper;
        }
        public async Task<EducationDtos> CreateEducationAsync(CreateEducationDto createEducationDto)
        {
            var education = _mapper.Map<Education>(createEducationDto);
            var lang = createEducationDto.Language ?? "en";
            education.Description = new Dictionary<string, string>
            {
                { lang, createEducationDto.Description ?? string.Empty }
            };
            education.Degree = new Dictionary<string, string>
            {
                { lang, createEducationDto.Degree ?? string.Empty }
            };
            education.CreatedAt = DateTime.UtcNow;
            education.UpdatedAt = null;
            var createdEducation = await _educationRepository.AddAsync(education);
            return MapEducationToDto(createdEducation, createEducationDto.Language);
        }

        public async Task<bool> DeleteEducationAsync(string id)
        {
            var education = await _educationRepository.GetByIdAsync(id);
            if (education == null)
            {
                throw new ApplicationException("Education entry not found.");
            }
            await _educationRepository.DeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<EducationDtos>> GetEducationsByUserIdAsync(string userId, string language = "en")
        {
            var educations = await _educationRepository.GetByUserIdAsync(userId);
            if (educations == null || !educations.Any())
            {
                return Enumerable.Empty<EducationDtos>();
            }

            return educations
                .Select(e => MapEducationToDto(e, language))
                .OrderBy(e => e.Order);
        }

        public async Task<IEnumerable<EducationDtos>> GetEducationByIdAsync(string experienceId)
        {
            var education = await _educationRepository.GetByIdAsync(experienceId);
            return _mapper.Map<IEnumerable<EducationDtos>>(education);
        }

        public async Task<bool> UpdateEducationAsync(string id, CreateEducationDto updateEducationDto)
        {
            var existingEducation = await _educationRepository.GetByIdAsync(id);
            if (existingEducation == null)
            {
                throw new ApplicationException("Education entry not found.");
            }
            _mapper.Map(updateEducationDto, existingEducation);

            var languageKey = updateEducationDto.Language ?? "en";

            if (existingEducation.Description == null)
            {
                existingEducation.Description = new Dictionary<string, string>();
            }
            existingEducation.Description[languageKey] = updateEducationDto.Description ?? string.Empty;

            if (existingEducation.Degree == null)
            {
                existingEducation.Degree = new Dictionary<string, string>();
            }
            existingEducation.Degree[languageKey] = updateEducationDto.Degree ?? string.Empty;
            existingEducation.UpdatedAt = DateTime.UtcNow;
            var updated = await _educationRepository.UpdateAsync(existingEducation);
            return true;
        }

        private EducationDtos MapEducationToDto(Education education, string? language)
        {
            var dto = _mapper.Map<EducationDtos>(education);
            var lang = string.IsNullOrWhiteSpace(language) ? "en" : language;
            dto.Description = _languageHelper.GetString(education.Description, lang);
            dto.Degree = _languageHelper.GetString(education.Degree, lang);
            return dto;
        }
    }
}
