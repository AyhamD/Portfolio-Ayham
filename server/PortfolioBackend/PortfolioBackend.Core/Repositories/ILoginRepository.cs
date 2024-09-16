using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Repositories
{
    public interface ILoginRepository
    {
        Task<ActionResult> RegisterUser(User registerdUser);
        Task<ActionResult> loginUser([FromBody] LoginDto loginDto);
        Task<ActionResult> LogoutUser();
        Task<ActionResult> CheckUser();
        Task<ActionResult> DeleteUser(string userId);
    }
}
