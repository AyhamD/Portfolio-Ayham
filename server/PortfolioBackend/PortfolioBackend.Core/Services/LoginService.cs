using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using System.Security.Claims;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    internal sealed class LoginService : ILoginService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public LoginService(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<ActionResult> CheckUser()
        {
            var isAuthenticated = _signInManager.Context.User.Identity.IsAuthenticated;
            if (!isAuthenticated)
            {
                return new UnauthorizedObjectResult("User is not authenticated.");
            }

            var userId = _signInManager.Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = _signInManager.Context.User.FindFirstValue(ClaimTypes.Name);
            var userEmail = _signInManager.Context.User.FindFirstValue(ClaimTypes.Email);

            return new OkObjectResult((new { id = userId, name = userName, email = userEmail }));
        }

        public async Task<ActionResult> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new NotFoundObjectResult("User not found.");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return new BadRequestObjectResult("Error deleting user.");
            }

            return new OkObjectResult("User deleted successfully.");
        }

        public async Task<ActionResult> loginUser(LoginDto loginDto)
        {
            var userNameOrEmail = loginDto.UsernameOrEmail;
            var password = loginDto.Password;
            var remember = loginDto.Remember;

            var user = userNameOrEmail.Contains("@")
                ? await _userManager.FindByEmailAsync(userNameOrEmail)
                : await _userManager.FindByNameAsync(userNameOrEmail);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return new UnauthorizedObjectResult("Check your login credentials and try again.");
            }

            await _signInManager.SignInAsync(user, remember);

            user.LastLogin = DateTime.Now;
            await _userManager.UpdateAsync(user);

            return new OkObjectResult(new { message = "Login Successfully.", data = user });
        }

        public async Task<ActionResult> LogoutUser()
        {
              await _signInManager.SignOutAsync();
        return new OkObjectResult(new { message = "Logged out successfully." });
        }

        public async Task<ActionResult> RegisterUser(User registerdUser)
        {
            var result = await _userManager.CreateAsync(registerdUser, registerdUser.PasswordHash);
            if (!result.Succeeded)
            {
                return new BadRequestObjectResult(result);
            }

            return new OkObjectResult(new { message = "Registered Successfully.", result });
        }
    }
}
