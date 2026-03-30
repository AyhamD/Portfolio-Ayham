using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Projects
{
    public sealed class GetProjectByIdUseCase : IUseCase<Guid, Project>
    {
        private readonly IProjectRepository _projectRepository;

        public GetProjectByIdUseCase(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<Project> ExecuteAsync(Guid projectId, CancellationToken cancellationToken = default)
        {
            var project = await _projectRepository.GetByIdAsync(projectId);
            
            if (project == null)
            {
                throw new ProjectNotFoundException(projectId);
            }

            return new Project
            {
                Id = project.Id,
                ProjectName = project.ProjectName,
                Company = project.Company,
                Description = project.Description,
                ProjectStartDate = project.ProjectStartDate,
                ProjectEndDate = project.ProjectEndDate,
                Role = project.Role,
                Competencies = project.Competencies?.Select(c => new Competency
                {
                    Id = c.Id,
                    CompetencyName = c.CompetencyName
                }).ToList() ?? new List<Competency>()
            };
        }
    }
}
