using AutoMapper;
using portfolio.Server.Infrastructure.Repositories;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class SkillService : ISkillService
    {
        private ISkillRepository _skillReposotory;
        private IMapper _mapper;

        public SkillService(ISkillRepository skillRepository, IMapper mapper)
        {
            _skillReposotory = skillRepository;
            _mapper = mapper;
        }

        public async Task<bool> DeleteSkillAsync(string id)
        {
            var skill = await _skillReposotory.GetByIdAsync(id);
            if (skill == null)
            {
                throw new ApplicationException("Skill entry not found.");
            }
            var result = await _skillReposotory.DeleteAsync(id);
            return result;
        }

        public async Task<SkillDtos?> GetSkillsByUserIdAsync(string userId)
        {
            var skills = await _skillReposotory.GetByUserIdAsync(userId);
            var skill = skills.FirstOrDefault();
            if (skill == null)
            {
                return null;
            }

            return _mapper.Map<SkillDtos>(skill);
        }

        public async Task<SkillDtos> UpdateSkillAsync(CreateSkillDto updateSkillDto)
        {
            var existingSkills = await _skillReposotory.GetByUserIdAsync(updateSkillDto.UserId);

            var skillToUpdate = existingSkills.FirstOrDefault();
            if (skillToUpdate != null)
            {
                _mapper.Map(updateSkillDto, skillToUpdate);
                skillToUpdate.UpdatedAt = DateTime.UtcNow;
                var updated = await _skillReposotory.UpdateAsync(skillToUpdate);
                return _mapper.Map<SkillDtos>(updated);
            }
            else
            {
                var skill = _mapper.Map<Skill>(updateSkillDto);
                var created = await _skillReposotory.AddAsync(skill);
                return _mapper.Map<SkillDtos>(created);
            }
        }
    }
}
