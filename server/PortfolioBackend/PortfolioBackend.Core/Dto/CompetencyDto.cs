using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class CompetencyDto
    {
        [Required(ErrorMessage = "Competency name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Competency name must be between 1 and 100 characters")]
        public string CompetencyName { get; set; } = string.Empty;

        public Guid ProjectId { get; set; }
    }
}
