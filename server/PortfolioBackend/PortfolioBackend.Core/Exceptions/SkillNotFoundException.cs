namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class SkillNotFoundException : NotFoundException
    {
        public SkillNotFoundException(int skillId)
            : base($"Skill with ID '{skillId}' was not found.")
        {
        }
    }
}
