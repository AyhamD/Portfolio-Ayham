using System.ComponentModel.DataAnnotations;

namespace Portfolio_Ayham.Server.PortfolioBackend.Core.Dto
{
    public class PersonalDtos
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Tagline { get; set; }
        public string? CvUrl { get; set; }
    }

    public class CreatePersonalDto
    {
        public string UserId { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Location { get; set; }
        public string? Title { get; set; }
        public string? Tagline { get; set; }
        public string? CvUrl { get; set; }

    }
}
