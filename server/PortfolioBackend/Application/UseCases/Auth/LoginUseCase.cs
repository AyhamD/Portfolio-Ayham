using Microsoft.AspNetCore.Identity;
using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.Application.UseCases.Auth
{
    public sealed class LoginUseCase : IUseCase<LoginDto, AuthResultDto>
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public LoginUseCase(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<AuthResultDto> ExecuteAsync(LoginDto request, CancellationToken cancellationToken = default)
        {
            var user = request.UsernameOrEmail.Contains("@")
                ? await _userManager.FindByEmailAsync(request.UsernameOrEmail)
                : await _userManager.FindByNameAsync(request.UsernameOrEmail);

            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                throw new InvalidCredentialsException();
            }

            await _signInManager.SignInAsync(user, request.Remember);

            user.LastLogin = DateTime.Now;
            await _userManager.UpdateAsync(user);

            return new AuthResultDto
            {
                Success = true,
                Message = "Login successful.",
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
