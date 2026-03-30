using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Application.UseCases.Skills;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly GetAllSkillsUseCase _getAllSkills;
        private readonly GetSkillByIdUseCase _getSkillById;
        private readonly CreateSkillUseCase _createSkill;
        private readonly DeleteSkillUseCase _deleteSkill;

        public SkillsController(
            GetAllSkillsUseCase getAllSkills,
            GetSkillByIdUseCase getSkillById,
            CreateSkillUseCase createSkill,
            DeleteSkillUseCase deleteSkill)
        {
            _getAllSkills = getAllSkills;
            _getSkillById = getSkillById;
            _createSkill = createSkill;
            _deleteSkill = deleteSkill;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            var skills = await _getAllSkills.ExecuteAsync();
            return Ok(skills);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int id)
        {
            var skill = await _getSkillById.ExecuteAsync(id);
            return Ok(skill);
        }

        [HttpPost]
        public async Task<ActionResult<Skill>> CreateSkill(SkillDto skillDto)
        {
            var skill = await _createSkill.ExecuteAsync(skillDto);
            return CreatedAtAction(nameof(GetSkill), new { id = skill.Id }, skill);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            await _deleteSkill.ExecuteAsync(id);
            return NoContent();
        }
    }
}
