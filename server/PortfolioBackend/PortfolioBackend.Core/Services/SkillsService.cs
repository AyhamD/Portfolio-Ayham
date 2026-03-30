using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class SkillsService(ISkillsRepository skillsRepository) : ISkillsService
    {
        public async Task<Skill> CreateAsync(SkillDto skillDto)
        {
            var existingSkill = await skillsRepository.GetByNameAsync(skillDto.SkillName);
            if (existingSkill != null)
            {
                throw new SkillAlreadyExistsException(skillDto.SkillName);
            }

            var skill = new Skill { SkillName = skillDto.SkillName };
            skillsRepository.Insert(skill);
            await skillsRepository.SaveChangesAsync();

            return skill;
        }

        public async Task DeleteAsync(int id)
        {
            var skill = await skillsRepository.GetByIdAsync(id);
            if (skill == null)
            {
                throw new SkillNotFoundException(id);
            }

            skillsRepository.Remove(skill);
            await skillsRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            return await skillsRepository.GetAllAsync();
        }

        public async Task<Skill?> GetByIdAsync(int id)
        {
            var skill = await skillsRepository.GetByIdAsync(id);
            if (skill == null)
            {
                throw new SkillNotFoundException(id);
            }

            return skill;
        }
    }
}
