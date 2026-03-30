using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class SkillDto
    {
        [Required(ErrorMessage = "Skill name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Skill name must be between 1 and 100 characters")]
        public string SkillName { get; set; } = string.Empty;
    }
}
