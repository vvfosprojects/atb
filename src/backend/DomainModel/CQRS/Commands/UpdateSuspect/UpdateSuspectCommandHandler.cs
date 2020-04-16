using CQRS.Commands;
using DomainModel.Classes.Exceptions;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;
using System.Linq;

namespace DomainModel.CQRS.Commands.UpdateSuspect
{
    public class UpdateSuspectCommandHandler : ICommandHandler<UpdateSuspectCommand>
    {
        private readonly ICryptools cryptools;
        private readonly IUpdateSuspect updateSuspect;
        private readonly IGetSessionContext getSessionContext;
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;
        private readonly IGetPatientByCaseNumber getPatientByCaseNumber;


        public UpdateSuspectCommandHandler(ICryptools cryptools, IUpdateSuspect updateSuspect, IGetSessionContext getSessionContext, 
            IGetSuspectByCaseNumber getSuspectByCaseNumber, IGetPatientByCaseNumber getPatientByCaseNumber)
        {
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.updateSuspect = updateSuspect ?? throw new ArgumentNullException(nameof(updateSuspect));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
            this.getPatientByCaseNumber = getPatientByCaseNumber;
        }

        public void Handle(UpdateSuspectCommand command)
        {
            command.Name = this.cryptools.Encrypt(command.Name);
            command.Surname = this.cryptools.Encrypt(command.Surname);
            command.Email = this.cryptools.Encrypt(command.Email);
            command.Phone = this.cryptools.Encrypt(command.Phone);
            command.Role = this.cryptools.Encrypt(command.Role);

            this.updateSuspect.Update(command, this.getSessionContext.GetActiveGroup());
        }
    }
}
