namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class LoginDto
    {
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }
        public bool Remember { get; set; }

    }
}
