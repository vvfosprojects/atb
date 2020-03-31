using CQRS.Commands;
using DomainModel.Services;
using DomainModel.Services.Users;

namespace DomainModel.CQRS.Commands.UpdatePositive
{
    public class UpdatePositiveCommandHandler : ICommandHandler<UpdatePositiveCommand>
    {
        private readonly ICryptools cryptools;
        private readonly IUpdatePositive updatePositive;
        private readonly IGetSessionContext getSessionContext;
        public UpdatePositiveCommandHandler(ICryptools cryptools, IUpdatePositive updatePositive, IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
            this.updatePositive = updatePositive;
        }

        public void Handle(UpdatePositiveCommand command)
        {
            command.Nome = this.cryptools.Encrypt(command.Nome);
            command.Cognome = this.cryptools.Encrypt(command.Cognome);
            command.Email = this.cryptools.Encrypt(command.Email);
            command.Phone = this.cryptools.Encrypt(command.Phone);
            command.Role = this.cryptools.Encrypt(command.Role);

            this.updatePositive.Update(command, this.getSessionContext.GetActiveGroup());
        }
    }
}
