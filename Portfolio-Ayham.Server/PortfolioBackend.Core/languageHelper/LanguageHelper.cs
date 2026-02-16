namespace Portfolio_Ayham.Server.PortfolioBackend.Core.languageHelper
{
    public class LanguageHelper
    {
        public string GetString(Dictionary<string, string> dict, string lang)
            => dict.TryGetValue(lang, out var val) ? val
             : dict.TryGetValue("en", out var enVal) ? enVal
             : string.Empty;

        public List<string> GetList(Dictionary<string, List<string>> dict, string lang)
           => dict.TryGetValue(lang, out var val) ? val
            : dict.TryGetValue("en", out var enVal) ? enVal
            : new List<string>();
    }
}
