using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Projects
{
    public sealed class DeleteProjectUseCase : IUseCase<Guid, bool>
    {
        private readonly IProjectRepository _projectRepository;

        public DeleteProjectUseCase(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<bool> ExecuteAsync(Guid projectId, CancellationToken cancellationToken = default)
        {
            var project = await _projectRepository.GetByIdAsync(projectId);
            
            if (project == null)
            {
                throw new ProjectNotFoundException(projectId);
            }

            _projectRepository.Remove(project);
            await _projectRepository.SaveChangesAsync();

            return true;
        }
    }
}
