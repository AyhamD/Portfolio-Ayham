using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Projects
{
    public record UpdateProjectRequest(Guid ProjectId, ProjectDto ProjectDto);

    public sealed class UpdateProjectUseCase : IUseCase<UpdateProjectRequest, bool>
    {
        private readonly IProjectRepository _projectRepository;

        public UpdateProjectUseCase(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<bool> ExecuteAsync(UpdateProjectRequest request, CancellationToken cancellationToken = default)
        {
            var project = await _projectRepository.GetByIdAsync(request.ProjectId);
            
            if (project == null)
            {
                throw new ProjectNotFoundException(request.ProjectId);
            }

            project.ProjectName = request.ProjectDto.ProjectName;
            project.Company = request.ProjectDto.Company;
            project.Description = request.ProjectDto.Description;
            project.ProjectStartDate = request.ProjectDto.ProjectStartDate;
            project.ProjectEndDate = request.ProjectDto.ProjectEndDate;
            project.Role = request.ProjectDto.Role;

            _projectRepository.Update(project);
            await _projectRepository.SaveChangesAsync();

            return true;
        }
    }
}
