using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Application.UseCases.Auth;
using PortfolioBackend.PortfolioBackend.Core.Dto;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginUseCase _loginUseCase;
        private readonly RegisterUseCase _registerUseCase;
        private readonly LogoutUseCase _logoutUseCase;
        private readonly GetCurrentUserUseCase _getCurrentUserUseCase;
        private readonly DeleteUserUseCase _deleteUserUseCase;

        public LoginController(
            LoginUseCase loginUseCase,
            RegisterUseCase registerUseCase,
            LogoutUseCase logoutUseCase,
            GetCurrentUserUseCase getCurrentUserUseCase,
            DeleteUserUseCase deleteUserUseCase)
        {
            _loginUseCase = loginUseCase;
            _registerUseCase = registerUseCase;
            _logoutUseCase = logoutUseCase;
            _getCurrentUserUseCase = getCurrentUserUseCase;
            _deleteUserUseCase = deleteUserUseCase;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResultDto>> RegisterUser([FromBody] RegisterDto registerDto)
        {
            var result = await _registerUseCase.ExecuteAsync(registerDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResultDto>> LoginUser([FromBody] LoginDto loginDto)
        {
            var result = await _loginUseCase.ExecuteAsync(loginDto);
            return Ok(result);
        }

        [HttpGet("logout"), Authorize]
        public async Task<IActionResult> LogoutUser()
        {
            await _logoutUseCase.ExecuteAsync();
            return Ok(new { message = "Logged out successfully." });
        }

        [HttpGet("authenticated")]
        public async Task<ActionResult<UserDto>> CheckUser()
        {
            var user = await _getCurrentUserUseCase.ExecuteAsync();
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }
            return Ok(user);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            await _deleteUserUseCase.ExecuteAsync(userId);
            return Ok(new { message = "User deleted successfully." });
        }
    }
}