using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Models
{
    public class Experience : BaseModels
    {
        public string UserId { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Order { get; set; } = 0;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; } = false;
        public string Description { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
    }
}
