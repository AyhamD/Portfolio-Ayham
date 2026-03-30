using Microsoft.AspNetCore.Identity;
using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.Application.UseCases.Auth
{
    public sealed class RegisterUseCase : IUseCase<RegisterDto, AuthResultDto>
    {
        private readonly UserManager<User> _userManager;

        public RegisterUseCase(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AuthResultDto> ExecuteAsync(RegisterDto request, CancellationToken cancellationToken = default)
        {
            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                Name = request.Name ?? request.UserName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            
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
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    UserName = user.UserName,
                    Email = user.Email,
                    IsAdmin = user.isAdmin,
                    LastLogin = user.LastLogin
                }
            };
        }
    }
}
