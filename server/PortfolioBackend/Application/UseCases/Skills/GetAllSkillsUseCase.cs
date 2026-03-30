using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Skills
{
    public sealed class GetAllSkillsUseCase : IUseCase<IEnumerable<Skill>>
    {
        private readonly ISkillsRepository _skillsRepository;

        public GetAllSkillsUseCase(ISkillsRepository skillsRepository)
        {
            _skillsRepository = skillsRepository;
        }

        public async Task<IEnumerable<Skill>> ExecuteAsync(CancellationToken cancellationToken = default)
        {
            return await _skillsRepository.GetAllAsync();
        }
    }
}
