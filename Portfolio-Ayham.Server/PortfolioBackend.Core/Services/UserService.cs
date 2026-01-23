using AutoMapper;
using portfolio.Server.Infrastructure.Services.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Dto;
using portfolio.Server.PortfolioBackend.Core.Interfaces;
using portfolio.Server.PortfolioBackend.Core.Models;
using portfolio.Server.PortfolioBackend.Core.Repositories;
using portfolio.Server.PortfolioBackend.Core.Services.Interfaces;
using PortfolioBackend.PortfolioBackend.Core.Models;

namespace portfolio.Server.PortfolioBackend.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly IPersonalRepository _personalRepository;

        public UserService(IUserRepository userRepository, IMapper mapper, Infrastructure.Services.Interfaces.IPasswordHasher passwordHasher, IPersonalRepository personalRepository, ITokenService tokenService) 
        {
            _passwordHasher = passwordHasher;
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenService = tokenService;
            _personalRepository = personalRepository;
        }

        public async Task<string> AuthenticateAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);

            if (user == null || !_passwordHasher.VerifyPassword(loginDto.Password, user.PasswordHash))
                throw new ApplicationException("Invalid credentials");

            return _tokenService.GenerateToken(user);
        }


        public async Task<UserDto> CreateUserAsync(CreateUserDto createUserDto)
        {
            if (await _userRepository.UserExistsAsync(createUserDto.Email))
            {
                throw new ApplicationException("User with this email already exists.");
            }

            var user = new User
            {
                Email = createUserDto.Email,
                Name = createUserDto.Name,
                PasswordHash = _passwordHasher.HashPassword(createUserDto.Password)
            };
            var personal = new Personal
            {
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = DateTime.UtcNow
            };

            await _personalRepository.AddAsync(personal);
            var createdUser = await _userRepository.AddAsync(user);

            return _mapper.Map<UserDto>(createdUser);
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException("User not found.");
            }
            return await _userRepository.DeleteAsync(userId);
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUserByIdAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> UpdateUserAsync(string userId, CreateUserDto updateUserDto)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException("User not found.");
            }
            user.Name = updateUserDto.Name;
            user.Email = updateUserDto.Email;
            user.PasswordHash = _passwordHasher.HashPassword(updateUserDto.Password);

            var updatedUser = await _userRepository.UpdateAsync(user);
            return updatedUser != null;
        }
    }
}
