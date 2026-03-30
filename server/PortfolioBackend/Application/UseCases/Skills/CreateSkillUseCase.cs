using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Skills
{
    public sealed class CreateSkillUseCase : IUseCase<SkillDto, Skill>
    {
        private readonly ISkillsRepository _skillsRepository;

        public CreateSkillUseCase(ISkillsRepository skillsRepository)
        {
            _skillsRepository = skillsRepository;
        }

        public async Task<Skill> ExecuteAsync(SkillDto request, CancellationToken cancellationToken = default)
        {
            // Business rule: Check if skill already exists
            var existingSkill = await _skillsRepository.GetByNameAsync(request.SkillName);
            if (existingSkill != null)
            {
                throw new SkillAlreadyExistsException(request.SkillName);
            }

            var skill = new Skill { SkillName = request.SkillName };
            
            _skillsRepository.Insert(skill);
            await _skillsRepository.SaveChangesAsync();

            return skill;
        }
    }
}
