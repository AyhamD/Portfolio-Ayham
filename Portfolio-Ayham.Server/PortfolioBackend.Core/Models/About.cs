using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Models
{
    public class About : BaseModels
    {
        public string UserId { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<string> Highlights { get; set; } = new();
        public List<Language> Languages { get; set; } = new();
        public string Location { get; set; } = string.Empty;
    }
}

public class Language
{
    public string Name { get; set; } = string.Empty;

    public string Level { get; set; } = string.Empty;
}
