using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Services;
using System.Diagnostics;
using System.Security.Claims;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(User user)
        {
            return await _loginService.RegisterUser(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult> loginUser([FromBody] LoginDto loginDto)
        {
            return await _loginService.loginUser(loginDto);

        }

        [HttpGet("logout"), Authorize]
        public async Task<ActionResult> LogoutUser()
        {
           return await _loginService.LogoutUser();
        }

        [HttpGet("authenticated")]
        public async Task<ActionResult> CheckUser()
        {
            return await _loginService.CheckUser();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteUser(string userUd)
        {
            return await _loginService.DeleteUser(userUd);
        }
    }
}

//"id": "1",
//  "userName": "Ayham",
//  "normalizedUserName": "string",
//  "email": "ayhamdarwish1993@gmail.com",
//  "normalizedEmail": "string",
//  "emailConfirmed": true,
//  "passwordHash": "123456",