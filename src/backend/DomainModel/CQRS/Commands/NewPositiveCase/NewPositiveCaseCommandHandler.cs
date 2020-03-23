using CQRS.Commands;
using DomainModel.Services;

namespace DomainModel.CQRS.Commands.AddPatientCommand
{
    public class NewPositiveCaseCommandHandler : ICommandHandler<NewPositiveCaseCommand>
    {
        private readonly INewPositiveCase addPatient;

        public NewPositiveCaseCommandHandler(INewPositiveCase addPatient)
        {
            this.addPatient = addPatient;
        }

        public void Handle(NewPositiveCaseCommand command)
        {
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