using Microsoft.AspNetCore.Identity;
using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.Application.UseCases.Auth
{
    public sealed class LogoutUseCase : IUseCase<bool>
    {
        private readonly SignInManager<User> _signInManager;

        public LogoutUseCase(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<bool> ExecuteAsync(CancellationToken cancellationToken = default)
        {
            await _signInManager.SignOutAsync();
            return true;
        }
    }
}
