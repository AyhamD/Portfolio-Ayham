using AutoMapper;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Repositories;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Dto;
using Portfolio_Ayham.Server.PortfolioBackend.Core.Services.Interfaces;

namespace Portfolio_Ayham.Server.PortfolioBackend.Core.Services
{
    public class PersonalService : IPersonalService
    {
        private readonly IMapper _mapper;
        private readonly IPersonalRepository _personalRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<PersonalService> _logger;

        public PersonalService(
            IMapper mapper,
            IPersonalRepository personalRepository,
            IUserRepository userRepository,
            ILogger<PersonalService> logger)
        {
            _mapper = mapper;
            _personalRepository = personalRepository;
            _userRepository = userRepository;
            _logger = logger;
        }
        public async Task<PersonalDtos> GetPersonalByUserIdAsync(string userId)
        {
            try
            {
                var personal = await _personalRepository.GetByUserIdAsync(userId);
                if (personal == null)
                {
                    // Create default personal info if it doesn't exist
                    personal = new Personal
                    {
                        UserId = userId,
                        Name = "",
                        Email = "",
                        PhoneNumber = "",
                        Address = "",
                        Location = "",
                        Title = "",
                        Summary = "",
                    };

                    await _personalRepository.AddAsync(personal);
                }
                return _mapper.Map<PersonalDtos>(personal);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting personal info for user {UserId}", userId);
                throw;
            }
        }

        public async Task<PersonalDtos> UpdatePersonalAsync(string userId, CreatePersonalDto updatePersonalDto)
        {
            try
            {
                var personal = await _personalRepository.GetByUserIdAsync(userId);

                if (personal == null)
                {
                    // Create new personal info
                    personal = _mapper.Map<Personal>(updatePersonalDto);
                    personal.UserId = userId;
                    await _personalRepository.AddAsync(personal);
                }
                else
                {
                    // Update existing personal info
                    _mapper.Map(updatePersonalDto, personal);
                    personal.UpdatedAt = DateTime.UtcNow;
                    await _personalRepository.UpdateAsync(personal);
                }

                return _mapper.Map<PersonalDtos>(personal);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating personal info for user {UserId}", userId);
                throw;
            }
        }
    }
}
