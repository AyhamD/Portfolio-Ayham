namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class TranslationAlreadyExistsException : BadRequestException
    {
        public TranslationAlreadyExistsException(string language, string key)
            : base($"Translation with language '{language}' and key '{key}' already exists.")
        {
        }
    }
}
