namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class SkillAlreadyExistsException : BadRequestException
    {
        public SkillAlreadyExistsException(string skillName)
            : base($"Skill '{skillName}' already exists.")
        {
        }
    }
}
