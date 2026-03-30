namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class InvalidCredentialsException : BadRequestException
    {
        public InvalidCredentialsException()
            : base("Check your login credentials and try again.")
        {
        }
    }
}
