using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Services;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] Contact contact)
        {
            try
            {
                await _contactService.SendEmailAsync(contact);
                return Ok("Message sent successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.ToString());
            }
        }
    }
}