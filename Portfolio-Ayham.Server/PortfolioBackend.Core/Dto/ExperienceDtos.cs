using System.ComponentModel.DataAnnotations;

namespace portfolio.Server.PortfolioBackend.Core.Dto
{
    public class ExperienceDtos
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class CreateExperienceDto
    {
        // UserId is populated server-side from the authenticated user
        public string UserId { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        // Accept dates as strings from the frontend and
        // parse them manually in the service layer.
        public string StartDate { get; set; } = string.Empty;
        public string? EndDate { get; set; }
    }
}
