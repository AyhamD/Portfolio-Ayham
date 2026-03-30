using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Application.UseCases.Projects
{
    public sealed class GetAllProjectsUseCase : IUseCase<IEnumerable<Project>>
    {
        private readonly IProjectRepository _projectRepository;

        public GetAllProjectsUseCase(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<Project>> ExecuteAsync(CancellationToken cancellationToken = default)
        {
            var projects = await _projectRepository.GetAllAsync();
            
            return projects.Select(p => new Project
            {
                Id = p.Id,
                ProjectName = p.ProjectName,
                Company = p.Company,
                Description = p.Description,
                ProjectStartDate = p.ProjectStartDate,
                ProjectEndDate = p.ProjectEndDate,
                Role = p.Role,
                Competencies = p.Competencies?.Select(c => new Competency
                {
                    Id = c.Id,
                    CompetencyName = c.CompetencyName
                }).ToList() ?? new List<Competency>()
            });
        }
    }
}
