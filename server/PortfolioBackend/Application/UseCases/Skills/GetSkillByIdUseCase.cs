using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Skills
{
    public sealed class GetSkillByIdUseCase : IUseCase<int, Skill>
    {
        private readonly ISkillsRepository _skillsRepository;

        public GetSkillByIdUseCase(ISkillsRepository skillsRepository)
        {
            _skillsRepository = skillsRepository;
        }

        public async Task<Skill> ExecuteAsync(int skillId, CancellationToken cancellationToken = default)
        {
            var skill = await _skillsRepository.GetByIdAsync(skillId);
            
            if (skill == null)
            {
                throw new SkillNotFoundException(skillId);
            }

            return skill;
        }
    }
}
