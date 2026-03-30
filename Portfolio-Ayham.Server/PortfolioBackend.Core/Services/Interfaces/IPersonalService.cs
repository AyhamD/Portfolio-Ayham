using Portfolio_Ayham.Server.PortfolioBackend.Core.Dto;

namespace Portfolio_Ayham.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface IPersonalService
    {
        Task<PersonalDtos> GetPersonalByUserIdAsync(string userId, string language = "en");
        Task<PersonalDtos> UpdatePersonalAsync(string userId, CreatePersonalDto updatePersonalDto);
    }
}
