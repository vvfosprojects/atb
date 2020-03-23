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
            if (command.Name == null)
                command.Name = string.Empty;
            if (command.Surname == null)
                command.Surname = string.Empty;
            if (command.Phone == null)
                command.Phone = string.Empty;
            if (command.Email == null)
                command.Email = string.Empty;

            this.newSuspect.Add(command);
        }
    }
}