using Microsoft.AspNetCore.Identity;
using PortfolioBackend.Application.Common;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.Application.UseCases.Auth
{
    public sealed class DeleteUserUseCase : IUseCase<string, bool>
    {
        private readonly UserManager<User> _userManager;

        public DeleteUserUseCase(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> ExecuteAsync(string userId, CancellationToken cancellationToken = default)
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

            return true;
        }
    }
}
