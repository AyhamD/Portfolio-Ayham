using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace PortfolioBackend.Infrastructure
{
    public sealed class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> option) : base(option)
        {

        }
        public DbSet<Translation> Translations { get; set; }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Competency> Competencies { get; set; }
        public DbSet<Skill> Skills { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Translation>()
                .HasKey(t => new { t.Language, t.Key });
        }
    }
}
