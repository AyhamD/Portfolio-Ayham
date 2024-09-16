using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    public interface ILoginService
    {
        Task<ActionResult> RegisterUser(User user);
        Task<ActionResult> loginUser([FromBody] LoginDto loginDto);
        Task<ActionResult> LogoutUser();
        Task<ActionResult> CheckUser();
        Task<ActionResult> DeleteUser(string userUd);
    }
}
