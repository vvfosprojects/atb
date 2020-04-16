using CQRS.Commands;
using DomainModel.Classes.Exceptions;
using DomainModel.Services;
using DomainModel.Services.Users;
using System.Linq;

namespace DomainModel.CQRS.Commands.UpdatePositive
{
    public class UpdatePositiveCommandHandler : ICommandHandler<UpdatePositiveCommand>
    {
        private readonly ICryptools cryptools;
        private readonly IUpdatePositive updatePositive;
        private readonly IGetSessionContext getSessionContext;
        private readonly IGetPatientByCaseNumber getPatientByCaseNumber;
        public UpdatePositiveCommandHandler(ICryptools cryptools, IUpdatePositive updatePositive, IGetSessionContext getSessionContext, IGetPatientByCaseNumber getPatientByCaseNumber)
        {
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
            this.updatePositive = updatePositive;
            this.getPatientByCaseNumber = getPatientByCaseNumber;
        }

        public void Handle(UpdatePositiveCommand command)
        {
            var positiveSheetToCheck = this.getPatientByCaseNumber.GetPatient(command.Number, this.getSessionContext.GetActiveGroup());

            command.Name = this.cryptools.Encrypt(command.Name);
            command.Surname = this.cryptools.Encrypt(command.Surname);
            command.Email = this.cryptools.Encrypt(command.Email);
            command.Phone = this.cryptools.Encrypt(command.Phone);
            command.Role = this.cryptools.Encrypt(command.Role);

            this.updatePositive.Update(command, this.getSessionContext.GetActiveGroup());
        }
    }
}
