using portfolio.Server.PortfolioBackend.Core.Dto;

namespace portfolio.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateUserAsync(CreateUserDto createUserDto);
        Task<UserDto> GetUserByIdAsync(string userId);
        Task<UserDto> GetUserByEmailAsync(string email);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<bool> UpdateUserAsync(string userId, CreateUserDto updateUserDto);
        Task<bool> DeleteUserAsync(string userId);
        Task<string> AuthenticateAsync(LoginDto loginDto);
    }
}
