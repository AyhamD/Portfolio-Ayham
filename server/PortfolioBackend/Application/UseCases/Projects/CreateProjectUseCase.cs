using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Projects
{
    public sealed class CreateProjectUseCase : IUseCase<ProjectDto, Project>
    {
        private readonly IProjectRepository _projectRepository;

        public CreateProjectUseCase(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<Project> ExecuteAsync(ProjectDto request, CancellationToken cancellationToken = default)
        {
            var project = new Project
            {
                ProjectName = request.ProjectName,
                Company = request.Company,
                Description = request.Description,
                ProjectStartDate = request.ProjectStartDate,
                ProjectEndDate = request.ProjectEndDate,
                Role = request.Role,
                Competencies = request.Competencies?.Select(c => new Competency
                {
                    CompetencyName = c.CompetencyName
                }).ToList() ?? new List<Competency>()
            };

            _projectRepository.Insert(project);
            await _projectRepository.SaveChangesAsync();

            return project;
        }
    }
}
