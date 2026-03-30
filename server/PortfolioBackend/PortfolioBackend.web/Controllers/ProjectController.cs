using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Application.UseCases.Projects;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly GetAllProjectsUseCase _getAllProjects;
        private readonly GetProjectByIdUseCase _getProjectById;
        private readonly CreateProjectUseCase _createProject;
        private readonly UpdateProjectUseCase _updateProject;
        private readonly DeleteProjectUseCase _deleteProject;

        public ProjectController(
            GetAllProjectsUseCase getAllProjects,
            GetProjectByIdUseCase getProjectById,
            CreateProjectUseCase createProject,
            UpdateProjectUseCase updateProject,
            DeleteProjectUseCase deleteProject)
        {
            _getAllProjects = getAllProjects;
            _getProjectById = getProjectById;
            _createProject = createProject;
            _updateProject = updateProject;
            _deleteProject = deleteProject;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProject()
        {
            var projects = await _getAllProjects.ExecuteAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(Guid id)
        {
            var project = await _getProjectById.ExecuteAsync(id);
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(ProjectDto projectDto)
        {
            var project = await _createProject.ExecuteAsync(projectDto);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(Guid id, ProjectDto projectDto)
        {
            await _updateProject.ExecuteAsync(new UpdateProjectRequest(id, projectDto));
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            await _deleteProject.ExecuteAsync(id);
            return NoContent();
        }
    }
}
