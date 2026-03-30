using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class ProjectDto
    {
        [Required(ErrorMessage = "Project name is required")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Project name must be between 1 and 200 characters")]
        public string ProjectName { get; set; } = string.Empty;

        [StringLength(2000, ErrorMessage = "Description cannot exceed 2000 characters")]
        public string? Description { get; set; }

        [StringLength(100, ErrorMessage = "Company name cannot exceed 100 characters")]
        public string? Company { get; set; }

        [StringLength(100, ErrorMessage = "Role cannot exceed 100 characters")]
        public string? Role { get; set; }

        public DateTime? ProjectStartDate { get; set; }

        public DateTime? ProjectEndDate { get; set; }

        public List<CompetencyDto>? Competencies { get; set; }
    }
}
