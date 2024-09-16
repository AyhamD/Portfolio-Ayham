namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class ProjectDto
    {
        public string? ProjectName { get; set; }
        public string? Description { get; set; }
        public string? Company { get; set; }
        public string? Role { get; set; }
        public DateTime? ProjectStartDate { get; set; }
        public DateTime? ProjectEndDate { get; set; }

        public List<CompetencyDto>? Competencies { get; set; }

    }
}
