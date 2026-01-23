using System.ComponentModel.DataAnnotations;

namespace portfolio.Server.PortfolioBackend.Core.Dto
{
    public class AboutDtos
    {
        public string id { get; set; } = string.Empty;
        public string userId { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<string> Highlights { get; set; } = new();
        public List<LanguageDto> Languages { get; set; } = new();
    }

    public class LanguageDto
    {
        public string Name { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
    }

    public class CreateAboutDto
    {
        public string userId { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<string> Highlights { get; set; } = new();
        public List<LanguageDto> Languages { get; set; } = new();

    }
}
