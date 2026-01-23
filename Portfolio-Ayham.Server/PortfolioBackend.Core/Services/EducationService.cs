using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using System.Collections.Generic;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class EducationService : IEducationService
    {
        private readonly IEducationRepository _educationRepository;
        private readonly IMapper _mapper;

        public EducationService(IEducationRepository educationRepository, IMapper mapper)
        {
            _educationRepository = educationRepository;
            _mapper = mapper;
        }
        public async Task<EducationDtos> CreateEducationAsync(CreateEducationDto createEducationDto)
        {
            var education = _mapper.Map<Education>(createEducationDto);
            education.CreatedAt = DateTime.UtcNow;
            education.UpdatedAt = null;
            var createdEducation = await _educationRepository.AddAsync(education);
            return _mapper.Map<EducationDtos>(createdEducation);
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

        public async Task<IEnumerable<EducationDtos>> GetEducationsByUserIdAsync(string userId)
        {
            var educations = await _educationRepository.GetByUserIdAsync(userId);
            if (educations == null)
            {
                throw new ApplicationException("No education entries found for user id {userId}");
            }
            return _mapper.Map<IEnumerable<EducationDtos>>(educations);
        }

        public async Task<IEnumerable<EducationDtos>> GetEducationByIdAsync(string experienceId)
        {
            var education = await _educationRepository.GetByIdAsync(experienceId);
            if (education == null)
            {
                return Enumerable.Empty<EducationDtos>();
            }
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
            existingEducation.UpdatedAt = DateTime.UtcNow;
            var updated = await _educationRepository.UpdateAsync(existingEducation);
            return true;
        }
    }
}
