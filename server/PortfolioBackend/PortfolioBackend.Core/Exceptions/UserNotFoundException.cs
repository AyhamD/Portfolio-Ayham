namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException(string userId)
            : base($"User with ID '{userId}' was not found.")
        {
        }
    }
}
