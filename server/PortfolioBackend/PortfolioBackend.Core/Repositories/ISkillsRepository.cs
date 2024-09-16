using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.Core.Repositories
{
    public interface ISkillsRepository
    {
        Task<ActionResult<IEnumerable<Skill>>> GetSkills();
        Task<ActionResult<Skill>> GetSkill(int id);
        Task<ActionResult<SkillDto>> CreateSkill(SkillDto skillDto);
        Task<ActionResult<Skill>> DeleteSkill(int id);
    }
}
