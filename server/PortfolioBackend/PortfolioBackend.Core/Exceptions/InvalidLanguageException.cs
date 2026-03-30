namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class InvalidLanguageException : BadRequestException
    {
        public InvalidLanguageException(string language)
            : base($"Language '{language}' is not valid. Allowed languages are: 'en', 'sv'.")
        {
        }
    }
}
