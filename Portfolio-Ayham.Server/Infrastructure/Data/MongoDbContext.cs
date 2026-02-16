using MongoDB.Driver;
using portfolio.Server.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
        private readonly ILogger<MongoDbContext> _logger;

        public MongoDbContext(IConfiguration configuration, ILogger<MongoDbContext> logger)
        {
            // Prefer strongly-typed MongoDb section from configuration
            var connectionString = configuration["MongoDb:ConnectionString"];
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                // Fallback to classic ConnectionStrings section if configured there
                connectionString = configuration.GetConnectionString("MongoDB");
            }

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new ArgumentNullException(nameof(connectionString), "MongoDB connection string is not configured. Please set 'MongoDb:ConnectionString' in appsettings.Development.json/appsettings.json or as an environment variable.");
            }

            var databaseName = configuration["MongoDb:DatabaseName"] ?? "Protfolio";

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
            _logger = logger;
            _logger.LogInformation($"Connecting to MongoDB Atlas with database: {databaseName}");

            CreateIndexes();
        }

        private void CreateIndexes()
        {
            //create unique index on Email
            Users.Indexes.CreateOne(
                new CreateIndexModel<User>(Builders<User>.IndexKeys.Ascending(u => u.Email),
                    new CreateIndexOptions { Unique = true }
                ));

            Abouts.Indexes.CreateOne(
                new CreateIndexModel<About>(Builders<About>.IndexKeys.Ascending(a => a.UserId)));
            Educations.Indexes.CreateOne(
                new CreateIndexModel<Education>(Builders<Education>.IndexKeys.Ascending(a => a.UserId)));
            Experiences.Indexes.CreateOne(
                new CreateIndexModel<Experience>(Builders<Experience>.IndexKeys.Ascending(a => a.UserId)));
            Skills.Indexes.CreateOne(
                new CreateIndexModel<Skill>(Builders<Skill>.IndexKeys.Ascending(a => a.UserId)));
            Projects.Indexes.CreateOne(
                new CreateIndexModel<Project>(Builders<Project>.IndexKeys.Ascending(a => a.UserId)));
            Personals.Indexes.CreateOne(
                new CreateIndexModel<Personal>(Builders<Personal>.IndexKeys.Ascending(a => a.UserId)));
        }

        public IMongoCollection<Personal> Personals => _database.GetCollection<Personal>("Personals");
        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<About> Abouts => _database.GetCollection<About>("Abouts");
        public IMongoCollection<Education> Educations => _database.GetCollection<Education>("Educations");
        public IMongoCollection<Experience> Experiences => _database.GetCollection<Experience>("Experiences");
        public IMongoCollection<Skill> Skills => _database.GetCollection<Skill>("Skills");
        public IMongoCollection<Project> Projects => _database.GetCollection<Project>("Projects");
        public IMongoDatabase Database => _database;
    }
}
