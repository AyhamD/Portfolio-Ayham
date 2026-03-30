using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Dto;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Services;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/translations")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly ITranslationService _translationService;

        public TranslationsController(ITranslationService translationService)
        {
            _translationService = translationService;
        }

        [HttpGet("{language}/{key}")]
        public async Task<ActionResult<Translation>> GetTranslationAsync(string language, string key)
        {
            var translation = await _translationService.GetByKeyAsync(language, key);
            return Ok(translation);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Translation>>> GetAllTranslationsAsync()
        {
            var translations = await _translationService.GetAllAsync();
            return Ok(translations);
        }

        [HttpPut("{language}/{key}")]
        public async Task<IActionResult> UpdateTranslationAsync(string language, string key, [FromBody] TranslationDto translationDto)
        {
            await _translationService.UpdateAsync(language, key, translationDto);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Translation>> CreateTranslationAsync([FromBody] TranslationDto translationDto)
        {
            var translation = await _translationService.CreateAsync(translationDto);
            return CreatedAtAction(nameof(GetTranslationAsync), 
                new { language = translation.Language, key = translation.Key }, translation);
        }

        [HttpDelete("{language}/{key}")]
        public async Task<IActionResult> DeleteTranslationAsync(string language, string key)
        {
            await _translationService.DeleteAsync(language, key);
            return NoContent();
        }
    }
}