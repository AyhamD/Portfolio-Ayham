using portfolio.Server.PortfolioBackend.Core.Dto;

namespace portfolio.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface IEducationService
    {
        Task<IEnumerable<EducationDtos>> GetEducationsByUserIdAsync(string userId, string language = "en");
        Task<IEnumerable<EducationDtos>> GetEducationByIdAsync(string educationId);
        Task<EducationDtos> CreateEducationAsync(CreateEducationDto createEducationDto);
        Task<bool> UpdateEducationAsync(string id, CreateEducationDto updateEducationDto);
        Task<bool> DeleteEducationAsync(string id);
    }
}
