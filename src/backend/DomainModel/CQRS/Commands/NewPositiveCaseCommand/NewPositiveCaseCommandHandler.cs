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
            this.addPatient.Add(command);
        }
    }
}
