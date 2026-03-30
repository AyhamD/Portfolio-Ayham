using Microsoft.AspNetCore.Identity;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;
using System.Security.Claims;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class LoginService : ILoginService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public LoginService(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public Task<UserDto?> GetCurrentUserAsync()
        {
            var principal = _signInManager.Context?.User;
            var isAuthenticated = principal?.Identity?.IsAuthenticated == true;
            if (!isAuthenticated)
            {
                return Task.FromResult<UserDto?>(null);
            }

            var userDto = new UserDto
            {
                Id = principal!.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty,
                UserName = principal!.FindFirstValue(ClaimTypes.Name) ?? principal!.Identity?.Name,
                Email = principal!.FindFirstValue(ClaimTypes.Email)
            };

            return Task.FromResult<UserDto?>(userDto);
        }

        public async Task DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException(userId);
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Error deleting user.");
            }
        }

        public async Task<AuthResultDto> LoginUserAsync(LoginDto loginDto)
        {
            var userNameOrEmail = loginDto.UsernameOrEmail;
            var password = loginDto.Password;
            var remember = loginDto.Remember;

            var user = userNameOrEmail.Contains("@")
                ? await _userManager.FindByEmailAsync(userNameOrEmail)
                : await _userManager.FindByNameAsync(userNameOrEmail);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                throw new InvalidCredentialsException();
            }

            await _signInManager.SignInAsync(user, remember);

            user.LastLogin = DateTime.Now;
            await _userManager.UpdateAsync(user);

            return new AuthResultDto
            {
                Success = true,
                Message = "Login successful.",
                User = MapToUserDto(user)
            };
        }

        public async Task LogoutUserAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<AuthResultDto> RegisterUserAsync(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Name = registerDto.Name ?? registerDto.UserName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return new AuthResultDto
                {
                    Success = false,
                    Message = "Registration failed.",
                    Errors = result.Errors.Select(e => e.Description)
                };
            }

            return new AuthResultDto
            {
                Success = true,
                Message = "Registration successful.",
                User = MapToUserDto(user)
            };
        }

        private static UserDto MapToUserDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                UserName = user.UserName,
                Email = user.Email,
                IsAdmin = user.isAdmin,
                LastLogin = user.LastLogin
            };
        }
    }
}
