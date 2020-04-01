using CQRS.Commands;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Commands.NewPositiveCase
{
    public class NewPositiveCaseCommandHandler : ICommandHandler<NewPositiveCaseCommand>
    {
        private readonly INewPositiveCase addPatient;
        private readonly IGetNextPositiveCaseNumber getNextPositiveCaseNumber;
        private readonly IGetSessionContext getSessionContext;


        public NewPositiveCaseCommandHandler(INewPositiveCase addPatient, IGetNextPositiveCaseNumber getNextPositiveCaseNumber, IGetSessionContext getSessionContext)
        {
            this.addPatient = addPatient ?? throw new ArgumentNullException(nameof(addPatient));
            this.getNextPositiveCaseNumber = getNextPositiveCaseNumber ?? throw new ArgumentNullException(nameof(getNextPositiveCaseNumber));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Handle(NewPositiveCaseCommand command)
        {
            if (command.Number == null)
                command.Number = getNextPositiveCaseNumber.Get(this.getSessionContext.GetActiveGroup()) + 1;
            if (command.Name == null)
                command.Name = string.Empty;
            if (command.Surname == null)
                command.Surname = string.Empty;
            if (command.Phone == null)
                command.Phone = string.Empty;
            if (command.Email == null)
                command.Email = string.Empty;

            this.addPatient.Add(command);
        }
    }
}