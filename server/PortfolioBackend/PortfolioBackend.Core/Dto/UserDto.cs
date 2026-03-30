namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime? LastLogin { get; set; }
    }
}
