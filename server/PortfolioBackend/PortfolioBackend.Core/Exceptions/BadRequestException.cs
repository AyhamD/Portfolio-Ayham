namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public abstract class BadRequestException : Exception
    {
        protected BadRequestException(string message) : base(message) { }
    }
}
