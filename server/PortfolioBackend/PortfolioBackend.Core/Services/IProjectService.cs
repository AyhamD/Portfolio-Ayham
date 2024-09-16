using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project> GetByIdAsync(Guid projectId);
        Task<Project> CreateAsync(ProjectDto projectDto);
        Task UpdateAsync(Guid projectId, ProjectDto projectDto);
        Task DeleteAsync(Guid projectId);
    }
}
