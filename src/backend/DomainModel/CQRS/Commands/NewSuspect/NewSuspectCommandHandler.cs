using CQRS.Commands;
using DomainModel.Services;

namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewSuspectCommandHandler : ICommandHandler<NewSuspectCommand>
    {
        private readonly INewSuspect newSuspect;
        private readonly IGetNextSuspectCaseNumber getNextSuspectCaseNumber;

        public NewSuspectCommandHandler(INewSuspect newSuspect, IGetNextSuspectCaseNumber getNextSuspectCaseNumber)
        {
            this.newSuspect = newSuspect;
            this.getNextSuspectCaseNumber = getNextSuspectCaseNumber;
        }

        public void Handle(NewSuspectCommand command)
        {
            if (command.Number == null)
                command.Number = this.getNextSuspectCaseNumber.Get() + 1;
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