using Microsoft.Extensions.DependencyInjection;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Services;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Services.Interfaces;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Services;
using Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper;

namespace Portfolio_Ayham.Server.PortfolioBackend.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEducationService, EducationService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IExperienceService, ExperienceService>();
            services.AddScoped<ISkillService, SkillService>();
            services.AddScoped<IAboutService, AboutService>();
            services.AddScoped<IPersonalService, PersonalService>();
            services.AddSingleton<LanguageHelper>();
            return services;
        }
    }
}