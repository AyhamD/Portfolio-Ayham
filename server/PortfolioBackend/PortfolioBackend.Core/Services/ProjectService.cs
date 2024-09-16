using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class ProjectService(IProjectRepository projectRepository) : IProjectService
    {

        public async Task<Project> CreateAsync(ProjectDto projectDto)
        {
            var project = new Project
            {
                ProjectName = projectDto.ProjectName,
                Company = projectDto.Company,
                Description = projectDto.Description,
                ProjectStartDate = projectDto.ProjectStartDate,
                Role = projectDto.Role,
                ProjectEndDate = projectDto.ProjectEndDate,
                Competencies = projectDto.Competencies.Select(c => new Competency
                {
                    CompetencyName = c.CompetencyName
                }).ToList()
            };

            projectRepository.Insert(project);
            await projectRepository.SaveChangesAsync();

            return project;
        }

        public async Task DeleteAsync(Guid projectId)
        {
            var project = await projectRepository.GetByIdAsync(projectId);
            if (project == null) throw new KeyNotFoundException("Project not found");

            projectRepository.Remove(project);
            await projectRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            var projects = await projectRepository.GetAllAsync();
            return projects.Select(p => new Project
            {
                Id = p.Id,
                ProjectName = p.ProjectName,
                Company = p.Company,
                Description = p.Description,
                ProjectStartDate = p.ProjectStartDate,
                ProjectEndDate = p.ProjectEndDate,
                Role = p.Role,
                Competencies = p.Competencies.Select(c => new Competency
                {
                    Id = c.Id,
                    CompetencyName = c.CompetencyName
                }).ToList()
            });
        }

        public async Task<Project> GetByIdAsync(Guid projectId)
        {
            var project = await projectRepository.GetByIdAsync(projectId);
            if (project == null) return null;

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

        public async Task UpdateAsync(Guid projectId, ProjectDto projectDto)
        {
            var project = await projectRepository.GetByIdAsync(projectId);
            if (project == null) throw new KeyNotFoundException("Project not found");

            projectRepository.Update(project);
            await projectRepository.SaveChangesAsync();
        }
    }
}
