namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class AboutNotFoundException : NotFoundException
    {
        public AboutNotFoundException(string userId)
            : base($"About section not found for user {userId}")
        {
        }
    }
}
