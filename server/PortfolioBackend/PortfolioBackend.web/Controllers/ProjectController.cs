using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioBackend.Infrastructure;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Services;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {

        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAllProject()
        {
            var projects = await _projectService.GetAllAsync();

            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(Guid id)
        {
            var project = await _projectService.GetByIdAsync(id);

            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> createProject(ProjectDto projectDto)
        {
            
            var project = await _projectService.CreateAsync(projectDto);

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectDto);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(Guid id, ProjectDto projectDto)
        {
            await _projectService.UpdateAsync(id, projectDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            await _projectService.DeleteAsync(id);

            return NoContent();
        }
    }
}
