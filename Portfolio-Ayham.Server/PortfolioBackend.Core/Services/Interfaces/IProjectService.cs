using portfolio.Server.PortfolioBackend.Core.Dto;

namespace portfolio.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDtos>> GetProjectsByUserIdAsync(string userId, string language = "en");
        Task<ProjectDtos> GetProjectByIdAsync(string projectId);
        Task<ProjectDtos> CreateProjectAsync(CreateProjectDto createProjectDto);
        Task<bool> UpdateProjectAsync(string id, CreateProjectDto updateProjectDto);
        Task<bool> DeleteProjectAsync(string id);
    }
}
