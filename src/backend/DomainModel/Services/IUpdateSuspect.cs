using DomainModel.CQRS.Commands.UpdateSuspect;

namespace DomainModel.Services
{
    public interface IUpdateSuspect
    {
        void Update(UpdateSuspectCommand command, string group);
    }
}
