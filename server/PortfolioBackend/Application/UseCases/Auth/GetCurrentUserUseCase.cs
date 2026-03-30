using Microsoft.AspNetCore.Identity;
using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using System.Security.Claims;

namespace PortfolioBackend.Application.UseCases.Auth
{
    public sealed class GetCurrentUserUseCase : IUseCase<UserDto?>
    {
        private readonly SignInManager<User> _signInManager;

        public GetCurrentUserUseCase(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public Task<UserDto?> ExecuteAsync(CancellationToken cancellationToken = default)
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
    }
}
