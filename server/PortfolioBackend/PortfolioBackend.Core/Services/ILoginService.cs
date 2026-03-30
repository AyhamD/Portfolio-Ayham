using PortfolioBackend.PortfolioBackend.Core.Dto;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    public interface ILoginService
    {
        Task<AuthResultDto> RegisterUserAsync(RegisterDto registerDto);
        Task<AuthResultDto> LoginUserAsync(LoginDto loginDto);
        Task LogoutUserAsync();
        Task<UserDto?> GetCurrentUserAsync();
        Task DeleteUserAsync(string userId);
    }
}
