using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        string? ValidateToken(string token);
    }
}
