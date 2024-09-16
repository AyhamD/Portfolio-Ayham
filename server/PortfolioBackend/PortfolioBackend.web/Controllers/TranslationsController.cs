using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioBackend.Infrastructure;
using PortfolioBackend.PortfolioBackend.Core.Models;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioBackend.PortfolioBackend.web.Controllers
{
    [Route("api/translations")]
    [ApiController]
    public class TranslationsController : ControllerBase
    {
        private readonly DataContext _context;

        public TranslationsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/translations/{language}/{key}
        [HttpGet("{language}/{key}")]
        public async Task<IActionResult> GetTranslationAsync(string language, string key)
        {
            var translation = await _context.Translations
                    .FindAsync(new { language, key });

            if (translation == null)
            {
                return NotFound();
            }

            return Ok(translation);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTranslationsAsync()
        {
            var translations = await _context.Translations.ToListAsync();
            return Ok(translations);
        }

        // PUT: api/translations/{id}
        [HttpPut("{key}")]
        public async Task<IActionResult> UpdateTranslationAsync([FromBody] Translation translationUpdate)
        {
            var translation = await _context.Translations.FindAsync(translationUpdate.Key);

            if (translation == null)
            {
                return NotFound();
            }

            if (translationUpdate.Language != "sv" && translationUpdate.Language != "en")
            {
                return BadRequest("Language must be 'sv' or 'en'.");
            }

            translation.Language = translationUpdate.Language;
            translation.Key = translationUpdate.Key;
            translation.Value = translationUpdate.Value;

            _context.Entry(translation).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/translations
        [HttpPost]
        public async Task<IActionResult> CreateTranslationAsync([FromBody] Translation newTranslation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (newTranslation.Language != "sv" && newTranslation.Language != "en")
            {
                return BadRequest("Language must be 'sv' or 'en'.");
            }

            var existingTranslation = await _context.Translations
            .FindAsync(new { newTranslation.Language, newTranslation.Key });

            if (existingTranslation != null)
            {
                return BadRequest("A translation with the same language and key already exists.");
            }

            _context.Translations.Add(newTranslation);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetTranslationAsync), new { language = newTranslation.Language, key = newTranslation.Key }, newTranslation);
        }
    }
}