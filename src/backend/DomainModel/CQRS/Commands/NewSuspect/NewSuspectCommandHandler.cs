using CQRS.Commands;
using DomainModel.Services;

namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewSuspectCommandHandler : ICommandHandler<NewSuspectCommand>
    {
        private readonly INewSuspect newSuspect;

        public NewSuspectCommandHandler(INewSuspect newSuspect)
        {
            this.newSuspect = newSuspect;
        }

        public void Handle(NewSuspectCommand command)
        {
            this.newSuspect.Add(command);
        }
    }
}
