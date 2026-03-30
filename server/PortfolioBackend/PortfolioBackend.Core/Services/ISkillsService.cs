using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Services
{
    public interface ISkillsService
    {
        Task<IEnumerable<Skill>> GetAllAsync();
        Task<Skill?> GetByIdAsync(int id);
        Task<Skill> CreateAsync(SkillDto skillDto);
        Task DeleteAsync(int id);
    }
}
