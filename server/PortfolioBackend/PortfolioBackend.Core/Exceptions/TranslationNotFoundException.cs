namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class TranslationNotFoundException : NotFoundException
    {
        public TranslationNotFoundException(string language, string key)
            : base($"Translation with language '{language}' and key '{key}' was not found.")
        {
        }
    }
}
