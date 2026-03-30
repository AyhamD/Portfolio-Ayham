using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioBackend.PortfolioBackend.Web.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        [Required]
        public string ProjectName { get; set; }
        public string Company { get; set; }
        public string Description { get; set; }
        public string Role { get; set; }
        public DateTime? ProjectStartDate { get; set; }
        public DateTime? ProjectEndDate { get; set; }
        public ICollection<Competency> Competencies { get; set; }

    }
}
