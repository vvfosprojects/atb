using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Commands.KeepAlive
{
    public class KeepAliveCommandAuthorizer : ICommandAuthorizer<KeepAliveCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public KeepAliveCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public IEnumerable<AuthorizationResult> Authorize(KeepAliveCommand command)
        {
            if (! this.getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
