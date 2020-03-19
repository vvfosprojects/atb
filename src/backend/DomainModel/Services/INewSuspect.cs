using DomainModel.CQRS.Commands.NewSuspectCommand;

namespace DomainModel.Services
{
   public interface INewSuspect
    {
        void Add(NewSuspectCommand command);
    }
}
