using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;
        public ProjectService(IProjectRepository projectRepository, IMapper mapper)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
        }
        public async Task<ProjectDtos> CreateProjectAsync(CreateProjectDto createProjectDto)
        {
            var project = _mapper.Map<Project>(createProjectDto);
            project.CreatedAt = DateTime.UtcNow;
            project.UpdatedAt = null;
            var createdProject = await _projectRepository.AddAsync(project);
            return _mapper.Map<ProjectDtos>(createdProject);
        }

        public async Task<bool> DeleteProjectAsync(string id)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            if (project == null)
            {
                throw new ApplicationException("Project entry not found.");
            }
            var result = await _projectRepository.DeleteAsync(id);
            return result;
        }

        public async Task<ProjectDtos> GetProjectByIdAsync(string projectId)
        {
            var project = await _projectRepository.GetByIdAsync(projectId);
            if (project == null)
            {
                throw new ApplicationException("Project entry not found.");
            }
            return _mapper.Map<ProjectDtos>(project);
        }

        public async Task<IEnumerable<ProjectDtos>> GetProjectsByUserIdAsync(string userId)
        {
            var projects = await _projectRepository.GetByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<ProjectDtos>>(projects);
        }

        public Task<bool> UpdateProjectAsync(string id, CreateProjectDto updateProjectDto)
        {
            var project = _mapper.Map<Project>(updateProjectDto);
            project.UpdatedAt = DateTime.UtcNow;
            _mapper.Map(updateProjectDto, project);
            var updated = _projectRepository.UpdateAsync(project);
            return Task.FromResult(true);
        }
    }
}
