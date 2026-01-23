// Controllers/HealthController.cs
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;

namespace portfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly MongoDbContext _context;
        private readonly ILogger<HealthController> _logger;

        public HealthController(MongoDbContext context, ILogger<HealthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> CheckHealth()
        {
            try
            {
                // Test database connection
                var isAlive = await _context.Users.Database.RunCommandAsync(
                    (Command<MongoDB.Bson.BsonDocument>)"{ping:1}"
                );

                var databaseName = _context.Users.Database.DatabaseNamespace.DatabaseName;

                return Ok(new
                {
                    status = "Healthy",
                    database = databaseName,
                    timestamp = DateTime.UtcNow,
                    message = "Successfully connected to MongoDB Atlas"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Health check failed");
                return StatusCode(500, new
                {
                    status = "Unhealthy",
                    error = ex.Message,
                    timestamp = DateTime.UtcNow
                });
            }
        }

        [HttpGet("collections")]
        public async Task<IActionResult> GetCollections()
        {
            try
            {
                var collections = await _context.Users.Database.ListCollectionNames().ToListAsync();

                return Ok(new
                {
                    collections = collections,
                    count = collections.Count
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}