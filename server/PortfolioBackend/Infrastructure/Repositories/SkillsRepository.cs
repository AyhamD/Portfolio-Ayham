using Microsoft.EntityFrameworkCore;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;

namespace PortfolioBackend.Infrastructure.Repositories
{
    internal class SkillsRepository(DataContext dataContext) : ISkillsRepository
    {
        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            return await dataContext.Skills.ToListAsync();
        }

        public async Task<Skill?> GetByIdAsync(int id)
        {
            return await dataContext.Skills.FindAsync(id);
        }

        public async Task<Skill?> GetByNameAsync(string skillName)
        {
            return await dataContext.Skills
                .FirstOrDefaultAsync(s => s.SkillName.ToLower() == skillName.ToLower());
        }

        public void Insert(Skill skill)
        {
            dataContext.Skills.Add(skill);
        }

        public void Remove(Skill skill)
        {
            dataContext.Skills.Remove(skill);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await dataContext.SaveChangesAsync();
        }
    }
}
