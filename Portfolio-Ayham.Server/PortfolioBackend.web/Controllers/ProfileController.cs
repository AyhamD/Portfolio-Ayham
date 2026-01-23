using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using System.Security.Claims;

namespace portfolio.Server.PortfolioBackend.web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IAboutService _aboutService;
        private readonly IEducationService _educationService;
        private readonly IExperienceService _experienceService;
        private readonly ISkillService _skillService;
        private readonly IProjectService _projectService;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(
        IAboutService aboutService,
        IEducationService educationService,
        IExperienceService experienceService,
        ISkillService skillService,
        IProjectService projectService,
        ILogger<ProfileController> logger)
        {
            _aboutService = aboutService;
            _educationService = educationService;
            _experienceService = experienceService;
            _skillService = skillService;
            _projectService = projectService;
            _logger = logger;
        }

        [HttpGet("about")]
        public async Task<ActionResult<AboutDtos>> GetAbout()
        {
            try
            {
                var userId = GetCurrentUserId();
                var about = await _aboutService.GetAboutByUserIdAsync(userId);
                return Ok(about);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting about");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("about")]
        public async Task<ActionResult<AboutDtos>> CreateOrUpdateAbout(CreateAboutDto createAboutDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                createAboutDto.userId = userId;

                var about = await _aboutService.CreateOrUpdateAboutAsync(createAboutDto);
                return Ok(about);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating/updating about");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("Skills")]
        public async Task<ActionResult<SkillDtos>> GetSkill()
        {
            try
            {
                var userId = GetCurrentUserId();
                var skill = await _skillService.GetSkillsByUserIdAsync(userId);

                if (skill == null)
                {
                    return Ok(new SkillDtos { Skills = new Dictionary<string, List<string>>() });
                }

                return Ok(skill);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting skill");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("Skills")]
        public async Task<ActionResult<SkillDtos>> UpdateSkill(CreateSkillDto updateSkillDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                updateSkillDto.UserId = userId;
                var updatedSkills = await _skillService.UpdateSkillAsync(updateSkillDto);

                return Ok(updatedSkills);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating skill");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("education")]
        public async Task<ActionResult<AboutDtos>> GetEducation()
        {
            try
            {
                var userId = GetCurrentUserId();
                var education = await _educationService.GetEducationsByUserIdAsync(userId);
                return Ok(education);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting education");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("education")]
        public async Task<ActionResult<AboutDtos>> CreateEduction(CreateEducationDto createEducationDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                createEducationDto.UserId = userId;

                var education = await _educationService.CreateEducationAsync(createEducationDto);
                return Ok(education);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating/updating about");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("experience")]
        public async Task<ActionResult<AboutDtos>> GetExperience()
        {
            try
            {
                var userId = GetCurrentUserId();
                var experience = await _experienceService.GetExperiencesByUserIdAsync(userId);
                return Ok(experience);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting experience");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("experience")]
        public async Task<ActionResult<ExperienceDtos>> CreateExperience(CreateExperienceDto createExperienceDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                createExperienceDto.UserId = userId;

                var experience = await _experienceService.CreateExperienceAsync(createExperienceDto);
                return CreatedAtAction(nameof(GetExperience), new { id = experience.Id }, experience);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating experience");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("experience/{id}")]
        public async Task<ActionResult<ExperienceDtos>> UpdateExperience(string id, CreateExperienceDto updateExperienceDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                updateExperienceDto.UserId = userId;

                var updatedExperience = await _experienceService.UpdateExperienceAsync(id, updateExperienceDto);
                return Ok(updatedExperience);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating experience");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("experience/{id}")]
        public async Task<ActionResult> DeleteExperience(string id)
        {
            try
            {
                var userId = GetCurrentUserId();
                var success = await _experienceService.DeleteExperienceAsync(id);

                if (!success)
                    return NotFound(new { message = "Experience not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting experience");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("projects")]
        public async Task<ActionResult<AboutDtos>> GetProjects()
        {
            try
            {
                var userId = GetCurrentUserId();
                var projects = await _projectService.GetProjectsByUserIdAsync(userId);
                return Ok(projects);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting projects");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("projects")]
        public async Task<ActionResult<AboutDtos>> CreateProject(CreateProjectDto createProjectDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                createProjectDto.UserId = userId;
                var project = await _projectService.CreateProjectAsync(createProjectDto);
                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating/updating project");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("projects/{id}")]
        public async Task<ActionResult<ProjectDtos>> updatePorject(string id, CreateProjectDto updateProjectDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                updateProjectDto.UserId = userId;

                var updateProject = await _projectService.UpdateProjectAsync(id, updateProjectDto);
                return Ok(updateProject);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating project");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("projects/{id}")]
        public async Task<ActionResult> DeleteProject(string id)
        {
            try
            {
                var userId = GetCurrentUserId();
                var success = await _projectService.DeleteProjectAsync(id);

                if (!success)
                    return NotFound(new { message = "Project not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting project");
                return BadRequest(new { message = ex.Message });
            }
        }

        private string GetCurrentUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException("User not authenticated");

            return userId;
        }
    }
}
