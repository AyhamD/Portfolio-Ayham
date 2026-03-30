using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using portfolio.Server.Infrastructure.Data;
using portfolio.Server.Infrastructure.Repositories;
using portfolio.Server.Infrastructure.Services;
using portfolio.Server.Infrastructure.Services.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Repositories;
using Portfolio_Ayham.Server.Infrastructure.Repositories;


namespace portfolio.Server.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services, IConfiguration configuration)
        {
            // MongoDB Context  
            services.AddSingleton<MongoDbContext>();
            services.AddScoped<IMongoDatabase>(sp => sp.GetRequiredService<MongoDbContext>().Database);

            // Repositories  
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPersonalRepository, PersonalRepository>();
            services.AddScoped<IAboutRepository, AboutRepository>();
            services.AddScoped<IEducationRepository, EducationRepository>();
            services.AddScoped<IExperienceRepository, ExperienceRepository>();
            services.AddScoped<ISkillRepository, SkillRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();

            // Services  
            services.AddScoped<IPasswordHasher, PasswordHasher>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
            });

            return services;
        }
    }
}
