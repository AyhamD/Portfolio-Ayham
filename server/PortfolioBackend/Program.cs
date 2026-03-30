using Microsoft.EntityFrameworkCore;
using PortfolioBackend.Application.UseCases.Auth;
using PortfolioBackend.Application.UseCases.Projects;
using PortfolioBackend.Application.UseCases.Skills;
using PortfolioBackend.Infrastructure;
using PortfolioBackend.Infrastructure.Middlewares;
using PortfolioBackend.Infrastructure.Repositories;
using PortfolioBackend.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Repositories;
using PortfolioBackend.PortfolioBackend.Core.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173/")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials());
});
builder.Services.AddDbContext<DataContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication();

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<DataContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;

    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

    options.Cookie.IsEssential = true;

});

// Register Repositories
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ISkillsRepository, SkillsRepository>();
builder.Services.AddScoped<ITranslationRepository, TranslationRepository>();

// Register Services (legacy - can be removed once all controllers use Use Cases)
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<ITranslationService, TranslationService>();

// Register Use Cases - Projects
builder.Services.AddScoped<GetAllProjectsUseCase>();
builder.Services.AddScoped<GetProjectByIdUseCase>();
builder.Services.AddScoped<CreateProjectUseCase>();
builder.Services.AddScoped<UpdateProjectUseCase>();
builder.Services.AddScoped<DeleteProjectUseCase>();

// Register Use Cases - Skills
builder.Services.AddScoped<GetAllSkillsUseCase>();
builder.Services.AddScoped<GetSkillByIdUseCase>();
builder.Services.AddScoped<CreateSkillUseCase>();
builder.Services.AddScoped<DeleteSkillUseCase>();

// Register Use Cases - Auth
builder.Services.AddScoped<LoginUseCase>();
builder.Services.AddScoped<RegisterUseCase>();
builder.Services.AddScoped<LogoutUseCase>();
builder.Services.AddScoped<GetCurrentUserUseCase>();
builder.Services.AddScoped<DeleteUserUseCase>();


builder.Services.AddIdentityCore<User>(options => { 
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 0;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    //user settings
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;

}).AddEntityFrameworkStores<DataContext>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add global exception handler middleware
app.UseGlobalExceptionHandler();

app.MapIdentityApi<User>();

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
