using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Repositories
{
    public interface IContactRepository
    {
        Task SendEmailAsync(Contact contact);
    }
}
