using CQRS.Commands;
using DomainModel.Services;

namespace DomainModel.CQRS.Commands.AddPatientCommand
{
    public class NewPositiveCommandHandler : ICommandHandler<NewPositiveCommand>
    {
        private readonly IAddPositive addPatient;

        public NewPositiveCommandHandler(IAddPositive addPatient)
        {
            this.addPatient = addPatient;
        }

        public void Handle(NewPositiveCommand command)
        {
            this.addPatient.Add(command);
        }
    }
}
