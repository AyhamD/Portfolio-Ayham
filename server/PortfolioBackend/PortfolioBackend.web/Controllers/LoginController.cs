using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Services;

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
        public async Task<ActionResult<AuthResultDto>> RegisterUser([FromBody] RegisterDto registerDto)
        {
            var result = await _loginService.RegisterUserAsync(registerDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResultDto>> LoginUser([FromBody] LoginDto loginDto)
        {
            var result = await _loginService.LoginUserAsync(loginDto);
            return Ok(result);
        }

        [HttpGet("logout"), Authorize]
        public async Task<IActionResult> LogoutUser()
        {
            await _loginService.LogoutUserAsync();
            return Ok(new { message = "Logged out successfully." });
        }

        [HttpGet("authenticated")]
        public async Task<ActionResult<UserDto>> CheckUser()
        {
            var user = await _loginService.GetCurrentUserAsync();
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }
            return Ok(user);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            await _loginService.DeleteUserAsync(userId);
            return Ok(new { message = "User deleted successfully." });
        }
    }
}