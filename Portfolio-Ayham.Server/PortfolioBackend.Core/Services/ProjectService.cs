using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Models;
using Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;
        private readonly LanguageHelper _languageHelper;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper, LanguageHelper languageHelper)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _languageHelper = languageHelper;
        }
        public async Task<ProjectDtos> CreateProjectAsync(CreateProjectDto createProjectDto)
        {
            var project = _mapper.Map<Project>(createProjectDto);
            project.Description = new Dictionary<string, string>
            {
                { createProjectDto.Language ?? "en", createProjectDto.Description ?? string.Empty }
            };
            project.CreatedAt = DateTime.UtcNow;
            project.UpdatedAt = null;
            var createdProject = await _projectRepository.AddAsync(project);
            return MapProjectToDto(createdProject, createProjectDto.Language);
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
            return MapProjectToDto(project, "en");
        }

        public async Task<IEnumerable<ProjectDtos>> GetProjectsByUserIdAsync(string userId, string language = "en")
        {
            var projects = await _projectRepository.GetByUserIdAsync(userId);
            return projects
                .Select(p => MapProjectToDto(p, language))
                .OrderBy(p => p.Order);
        }

        public async Task<bool> UpdateProjectAsync(string id, CreateProjectDto updateProjectDto)
        {
            var existingProject = await _projectRepository.GetByIdAsync(id);
            if (existingProject == null)
            {
                throw new ApplicationException("Project entry not found.");
            }

            _mapper.Map(updateProjectDto, existingProject);
            if (existingProject.Description == null)
            {
                existingProject.Description = new Dictionary<string, string>();
            }

            var lang = updateProjectDto.Language ?? "en";
            existingProject.Description[lang] = updateProjectDto.Description ?? string.Empty;
            existingProject.UpdatedAt = DateTime.UtcNow;

            await _projectRepository.UpdateAsync(existingProject);
            return true;
        }

        private ProjectDtos MapProjectToDto(Project project, string? language)
        {
            var dto = _mapper.Map<ProjectDtos>(project);
            var lang = string.IsNullOrWhiteSpace(language) ? "en" : language;
            dto.Description = _languageHelper.GetString(project.Description, lang);
            return dto;
        }
    }
}
