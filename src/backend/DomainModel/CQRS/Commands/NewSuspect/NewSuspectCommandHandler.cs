using CQRS.Commands;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewSuspectCommandHandler : ICommandHandler<NewSuspectCommand>
    {
        private readonly INewSuspect newSuspect;
        private readonly IGetNextSuspectCaseNumber getNextSuspectCaseNumber;
        private readonly IGetSessionContext getSessionContext;

        public NewSuspectCommandHandler(INewSuspect newSuspect, IGetNextSuspectCaseNumber getNextSuspectCaseNumber, IGetSessionContext getSessionContext)
        {
            this.newSuspect = newSuspect ?? throw new ArgumentNullException(nameof(newSuspect));
            this.getNextSuspectCaseNumber = getNextSuspectCaseNumber ?? throw new ArgumentNullException(nameof(getNextSuspectCaseNumber));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Handle(NewSuspectCommand command)
        {
            if (command.Number == null)
                command.Number = this.getNextSuspectCaseNumber.Get(this.getSessionContext.GetActiveGroup()) + 1;
            if (string.IsNullOrWhiteSpace(command.Name))
                command.Name = string.Empty;
            if (string.IsNullOrWhiteSpace(command.Surname))
                command.Surname = string.Empty;
            if (string.IsNullOrWhiteSpace(command.Phone))
                command.Phone = string.Empty;
            if (string.IsNullOrWhiteSpace(command.Email))
                command.Email = string.Empty;

            this.newSuspect.Add(command);
        }
    }
}
