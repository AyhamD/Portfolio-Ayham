using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Models;
using PortfolioBackend.PortfolioBackend.Core.Models;
using AutoMapper;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Dto;

namespace Portfolio_Ayham.Server.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true));

            // About mappings
            CreateMap<About, AboutDtos>();
            CreateMap<CreateAboutDto, About>();
            CreateMap<Language, LanguageDto>().ReverseMap();

            // Education mappings
            CreateMap<Education, EducationDtos>();
            CreateMap<CreateEducationDto, Education>();

            // Experience mappings
            CreateMap<Experience, ExperienceDtos>();
            CreateMap<CreateExperienceDto, Experience>()
                // Dates are provided as strings in the DTO and parsed manually in the service
                .ForMember(dest => dest.StartDate, opt => opt.Ignore())
                .ForMember(dest => dest.EndDate, opt => opt.Ignore());

            CreateMap<Personal, PersonalDtos>();
            CreateMap<CreatePersonalDto, Personal>();

            // Skill mappings
            CreateMap<Skill, SkillDtos>();
            CreateMap<CreateSkillDto, Skill>();

            // Project mappings
            CreateMap<Project, ProjectDtos>();
            CreateMap<CreateProjectDto, Project>();
        }
    }
}
