namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class NullValue : BadRequestException
    {
        public NullValue(string message)
        : base(message)
        {
        }
    }
}
