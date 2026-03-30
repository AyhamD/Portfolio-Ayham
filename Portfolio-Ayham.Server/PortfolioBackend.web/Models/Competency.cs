using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioBackend.PortfolioBackend.Web.Models
{
    public class Competency
    {
        public Guid Id { get; set; }

        [Required]
        public string CompetencyName { get; set; }

        public Guid ProjectId { get; set; }

        public Project Project { get; set; }
    }
}
