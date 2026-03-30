namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class AuthResultDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public UserDto? User { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
