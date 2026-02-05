using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioBackend.PortfolioBackend.Core.Models
{
    public class Project : BaseModels
    {
        public string UserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Client { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
        public string Category { get; set; } = string.Empty;
        public int Order { get; set; } = 0;
    }
}
