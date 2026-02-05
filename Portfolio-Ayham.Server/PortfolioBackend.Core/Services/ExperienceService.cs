using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class ExperienceService : IExperienceService
    {
        private readonly IExperienceRepository _experienceRepository;
        private readonly IMapper _mapper;

        public ExperienceService(IExperienceRepository experienceRepository, IMapper mapper)
        {
            _experienceRepository = experienceRepository;
            _mapper = mapper;
        }
        public async Task<ExperienceDtos> CreateExperienceAsync(CreateExperienceDto createExperienceDto)
        {
            var experience = _mapper.Map<Experience>(createExperienceDto);
            if(experience.EndDate != null && experience.EndDate < experience.StartDate)
            {
                throw new ApplicationException("End date cannot be earlier than start date.");
            }
            experience.CreatedAt = DateTime.UtcNow;
            experience.UpdatedAt = null;
            var createdExperience = await _experienceRepository.AddAsync(experience);
            return _mapper.Map<ExperienceDtos>(createdExperience);
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

        public async Task<IEnumerable<ExperienceDtos>> GetExperiencesByUserIdAsync(string userId)
        {
            var experiences = await _experienceRepository.GetByUserIdAsync(userId);
            if (experiences == null || !experiences.Any())
            {
                // Return empty list instead of throwing so API can respond with 200 and []
                return Enumerable.Empty<ExperienceDtos>();
            }

            return _mapper.Map<IEnumerable<ExperienceDtos>>(experiences);
        }

        public async Task<bool> UpdateExperienceAsync(string id, CreateExperienceDto updateExperienceDto)
        {
            var existingExperience = await _experienceRepository.GetByIdAsync(id);
            if (existingExperience == null)
            {
                throw new ApplicationException("Experience entry not found.");
            }
            if (existingExperience.EndDate != null && existingExperience.EndDate < existingExperience.StartDate)
            {
                throw new ApplicationException("End date cannot be earlier than start date.");
            }
            existingExperience.UpdatedAt = DateTime.UtcNow;
            _mapper.Map(updateExperienceDto, existingExperience);
            var updated = await _experienceRepository.UpdateAsync(existingExperience);
            return true;
        }
    }
}
