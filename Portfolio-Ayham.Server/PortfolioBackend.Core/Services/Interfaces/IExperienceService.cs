using portfolio.Server.PortfolioBackend.Core.Dto;

namespace portfolio.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface IExperienceService
    {
        Task<IEnumerable<ExperienceDtos>> GetExperiencesByUserIdAsync(string userId);
        Task<ExperienceDtos> GetExperienceByIdAsync(string experienceId);

        Task<ExperienceDtos> CreateExperienceAsync(CreateExperienceDto createExperienceDto);
        Task<bool> UpdateExperienceAsync(string id, CreateExperienceDto updateExperienceDto);
        Task<bool> DeleteExperienceAsync(string id);
    }
}
