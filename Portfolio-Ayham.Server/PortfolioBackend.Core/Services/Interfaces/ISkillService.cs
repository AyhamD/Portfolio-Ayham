using portfolio.Server.PortfolioBackend.Core.Dto;

namespace portfolio.Server.PortfolioBackend.Core.Services.Interfaces
{
    public interface ISkillService
    {
        Task<SkillDtos?> GetSkillsByUserIdAsync(string userId);
        Task<SkillDtos> UpdateSkillAsync(CreateSkillDto updateSkillDto);
        Task<bool> DeleteSkillAsync(string id);
    }
}
