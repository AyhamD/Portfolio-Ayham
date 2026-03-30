using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Skills
{
    public sealed class DeleteSkillUseCase : IUseCase<int, bool>
    {
        private readonly ISkillsRepository _skillsRepository;

        public DeleteSkillUseCase(ISkillsRepository skillsRepository)
        {
            _skillsRepository = skillsRepository;
        }

        public async Task<bool> ExecuteAsync(int skillId, CancellationToken cancellationToken = default)
        {
            var skill = await _skillsRepository.GetByIdAsync(skillId);
            
            if (skill == null)
            {
                throw new SkillNotFoundException(skillId);
            }

            _skillsRepository.Remove(skill);
            await _skillsRepository.SaveChangesAsync();

            return true;
        }
    }
}
