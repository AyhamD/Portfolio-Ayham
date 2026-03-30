using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Repositories
{
    public interface ISkillsRepository
    {
        Task<IEnumerable<Skill>> GetAllAsync();
        Task<Skill?> GetByIdAsync(int id);
        Task<Skill?> GetByNameAsync(string skillName);
        void Insert(Skill skill);
        void Remove(Skill skill);
        Task<int> SaveChangesAsync();
    }
}
