using System.ComponentModel.DataAnnotations;

namespace portfolio.Server.PortfolioBackend.Core.Dto
{
    public class ProjectDtos
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Client { get; set; } = string.Empty;
        public string Role { get; set; }
        public string year { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
    }

    public class CreateProjectDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Client { get; set; } = string.Empty;
        public string Role { get; set; }
        public string year { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
    }

}
