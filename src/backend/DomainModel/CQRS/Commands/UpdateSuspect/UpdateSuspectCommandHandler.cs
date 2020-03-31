using CQRS.Commands;
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

        public UpdateSuspectCommandHandler(ICryptools cryptools, IUpdateSuspect updateSuspect, IGetSessionContext getSessionContext)
        {
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.updateSuspect = updateSuspect ?? throw new ArgumentNullException(nameof(updateSuspect));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Handle(UpdateSuspectCommand command)
        {
            command.Nome = this.cryptools.Encrypt(command.Nome);
            command.Cognome = this.cryptools.Encrypt(command.Cognome);
            command.Email = this.cryptools.Encrypt(command.Email);
            command.Phone = this.cryptools.Encrypt(command.Phone);
            command.Role = this.cryptools.Encrypt(command.Role);

            this.updateSuspect.Update(command, this.getSessionContext.GetActiveGroup());
        }
    }
}
