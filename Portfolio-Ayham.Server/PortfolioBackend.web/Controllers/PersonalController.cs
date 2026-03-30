using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Dto;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Services.Interfaces;
using System.Security.Claims;

namespace Portfolio_Ayham.Server.PortfolioBackend.web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PersonalController : ControllerBase
    {
        private readonly IPersonalService _personalService;
        private readonly ILogger<PersonalController> _logger;
        private readonly IConfiguration _configuration;

        public PersonalController(
            IPersonalService personalService,
            ILogger<PersonalController> logger,
            IConfiguration configuration)
        {
            _personalService = personalService;
            _logger = logger;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<PersonalDtos>> GetPersonal([FromQuery] string? lang = "en")
        {
            try
            {
                var ownerUserId = GetPortfolioOwnerUserId();
            var personal = await _personalService.GetPersonalByUserIdAsync(ownerUserId, lang ?? "en");
                return Ok(personal);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting personal info");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPut]
        public async Task<ActionResult<PersonalDtos>> UpdatePersonal(CreatePersonalDto updatePersonalDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                updatePersonalDto.UserId = userId;

                var updatedPersonal = await _personalService.UpdatePersonalAsync(userId, updatePersonalDto);
                return Ok(updatedPersonal);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating personal info");
                return BadRequest(new { message = ex.Message });
            }
        }

        private string GetPortfolioOwnerUserId()
        {
            var ownerUserId = _configuration["Portfolio:OwnerUserId"];

            if (string.IsNullOrWhiteSpace(ownerUserId))
            {
                throw new InvalidOperationException("Portfolio owner user id is not configured. Please set 'Portfolio:OwnerUserId' in appsettings.json.");
            }

            return ownerUserId;
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
