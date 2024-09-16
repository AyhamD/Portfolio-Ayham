using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioBackend.PortfolioBackend.Core.Models
{
    public class Translation
    {
        [Key]
        [Required]
        [Column(Order = 1)]
        public string Key { get; set; }
        [Required]
        [Column(Order = 0)]
        public string Language { get; set; }
        [Required]
        public string Value { get; set; }
    }
}
