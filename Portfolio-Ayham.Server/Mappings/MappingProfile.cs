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
            CreateMap<About, AboutDtos>()
                .ForMember(dest => dest.Summary, opt => opt.Ignore())
                .ForMember(dest => dest.Highlights, opt => opt.Ignore());
            CreateMap<CreateAboutDto, About>();
            CreateMap<Language, LanguageDto>().ReverseMap();

            // Education mappings
            CreateMap<Education, EducationDtos>()
                .ForMember(dest => dest.Description, opt => opt.Ignore())
                .ForMember(dest => dest.Degree, opt => opt.Ignore());
            CreateMap<CreateEducationDto, Education>()
                .ForMember(dest => dest.Description, opt => opt.Ignore())
                .ForMember(dest => dest.Degree, opt => opt.Ignore());

            // Experience mappings
                CreateMap<Experience, ExperienceDtos>()
                    .ForMember(dest => dest.Description, opt => opt.Ignore());
            CreateMap<CreateExperienceDto, Experience>()
                // Dates are provided as strings in the DTO and parsed manually in the service
                    .ForMember(dest => dest.StartDate, opt => opt.Ignore())
                    .ForMember(dest => dest.EndDate, opt => opt.Ignore())
                    .ForMember(dest => dest.Description, opt => opt.Ignore());

            CreateMap<Personal, PersonalDtos>()
                .ForMember(dest => dest.Tagline, opt => opt.Ignore());
            CreateMap<CreatePersonalDto, Personal>()
                .ForMember(dest => dest.Taglines, opt => opt.Ignore());

            // Skill mappings
            CreateMap<Skill, SkillDtos>();
            CreateMap<CreateSkillDto, Skill>();

            // Project mappings
            CreateMap<Project, ProjectDtos>()
                .ForMember(dest => dest.Description, opt => opt.Ignore());
            CreateMap<CreateProjectDto, Project>()
                .ForMember(dest => dest.Description, opt => opt.Ignore());
        }
    }
}
