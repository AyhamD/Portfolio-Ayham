using portfolio.Server.PortfolioBackend.Core.Dto;

namespace portfolio.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface IAboutService
    {
        Task<AboutDtos> GetAboutByUserIdAsync(string userId);
        Task<AboutDtos> CreateOrUpdateAboutAsync(CreateAboutDto createAboutDto);
        Task<bool> DeleteAboutAsync(string userId);
    }
}
