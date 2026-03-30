using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.PortfolioBackend.Core.Dto
{
    public class TranslationDto
    {
        [Required(ErrorMessage = "Language is required")]
        [RegularExpression("^(en|sv)$", ErrorMessage = "Language must be 'en' or 'sv'")]
        public string Language { get; set; } = string.Empty;

        [Required(ErrorMessage = "Key is required")]
        public string Key { get; set; } = string.Empty;

        [Required(ErrorMessage = "Value is required")]
        public string Value { get; set; } = string.Empty;
    }
}
