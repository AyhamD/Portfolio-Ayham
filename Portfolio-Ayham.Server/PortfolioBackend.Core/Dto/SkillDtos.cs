using System.ComponentModel.DataAnnotations;

namespace portfolio.Server.PortfolioBackend.Core.Dto
{
    public class SkillDtos
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public Dictionary<string, List<string>> Skills { get; set; } = new();
    }

    public class CreateSkillDto
    {
        // UserId is populated server-side from the authenticated user
        public string UserId { get; set; } = string.Empty;
        public Dictionary<string, List<string>> Skills { get; set; } = new();
    }
}
