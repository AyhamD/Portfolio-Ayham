namespace PortfolioBackend.PortfolioBackend.Core.Exceptions
{
    public sealed class ProjectNotFoundException : NotFoundException
    {
        public ProjectNotFoundException(Guid projectId)
            : base($"Project with ID '{projectId}' was not found.")
        {
        }
    }
}
