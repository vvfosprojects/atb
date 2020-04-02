using CQRS.Commands;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Commands.KeepAlive
{
    public class KeepAliveCommandHandler : ICommandHandler<KeepAliveCommand>
    {
        private readonly IKeepAlive keepAlive;
        private readonly IGetSessionContext getSessionContext;

        public KeepAliveCommandHandler(IKeepAlive keepAlive, IGetSessionContext getSessionContext)
        {
            this.keepAlive = keepAlive ?? throw new ArgumentNullException(nameof(keepAlive));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Handle(KeepAliveCommand command)
        {
            this.keepAlive.Insert(new KeepAliveCommand() 
            { 
                Group = this.getSessionContext.GetActiveGroup(),
                Data = DateTime.UtcNow,
                Utente = this.getSessionContext.GetLoggedUsername()
            });
        }
    }
}
