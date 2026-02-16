using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Models
{
    public class Education : BaseModels
    {
        public string UserId { get; set; } = string.Empty;
        public string School { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public Dictionary<string, string> Description { get; set; } = new();
        public int Order { get; set; } = 0;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
