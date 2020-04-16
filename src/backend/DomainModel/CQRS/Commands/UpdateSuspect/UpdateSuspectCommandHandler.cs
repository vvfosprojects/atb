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


        public UpdateSuspectCommandHandler(ICryptools cryptools, IUpdateSuspect updateSuspect, IGetSessionContext getSessionContext, 
            IGetSuspectByCaseNumber getSuspectByCaseNumber)
        {
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.updateSuspect = updateSuspect ?? throw new ArgumentNullException(nameof(updateSuspect));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
        }

        public void Handle(UpdateSuspectCommand command)
        {
            var suspectSheet = this.getSuspectByCaseNumber.GetSuspect(command.Number, this.getSessionContext.GetActiveGroup());
            var lastData = suspectSheet.Data.LastOrDefault();

            if (lastData != null)
            {
                var linkClosed = (lastData.Link != null) ? lastData.Link.Closed : false;
                if (linkClosed)
                {
                    throw new AtbApplicationException("Attenzione: la scheda che si sta tentando di modificare è chiusa!");
                }
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
