using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    public interface IContactService
    {
        Task SendEmailAsync(Contact contact);
    }
}
