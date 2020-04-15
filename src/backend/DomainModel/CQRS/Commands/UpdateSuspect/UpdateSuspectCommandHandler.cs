using CQRS.Commands;
using DomainModel.Classes.Exceptions;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Commands.UpdateSuspect
{
    public class UpdateSuspectCommandHandler : ICommandHandler<UpdateSuspectCommand>
    {
        private readonly ICryptools cryptools;
        private readonly IUpdateSuspect updateSuspect;
        private readonly IGetSessionContext getSessionContext;
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;

        public UpdateSuspectCommandHandler(ICryptools cryptools, IUpdateSuspect updateSuspect, IGetSessionContext getSessionContext, IGetSuspectByCaseNumber getSuspectByCaseNumber)
        {
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.updateSuspect = updateSuspect ?? throw new ArgumentNullException(nameof(updateSuspect));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
        }

        public void Handle(UpdateSuspectCommand command)
        {
            //check if sheet is closed
            var suspectSheetToCheck = this.getSuspectByCaseNumber.GetSuspect(command.Number, this.getSessionContext.GetActiveGroup());
            if (suspectSheetToCheck.Closed)
            {
                throw new AtbApplicationException("Attenzione: stai tentando di modificare una scheda chiusa!");
            }

            command.Name = this.cryptools.Encrypt(command.Name);
            command.Surname = this.cryptools.Encrypt(command.Surname);
            command.Email = this.cryptools.Encrypt(command.Email);
            command.Phone = this.cryptools.Encrypt(command.Phone);
            command.Role = this.cryptools.Encrypt(command.Role);



            this.updateSuspect.Update(command, this.getSessionContext.GetActiveGroup());
        }
    }
}
