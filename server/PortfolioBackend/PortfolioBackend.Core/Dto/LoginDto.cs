using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Username or email is required")]
        public string UsernameOrEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

        public bool Remember { get; set; }
    }
}
