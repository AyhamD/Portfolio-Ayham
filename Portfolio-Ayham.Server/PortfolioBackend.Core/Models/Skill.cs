namespace PortfolioBackend.PortfolioBackend.Core.Models
{
    public class Skill : BaseModels
    {
        public string UserId { get; set; } = string.Empty;
        public Dictionary<string, List<string>> Skills { get; set; } = new();
    }
}
