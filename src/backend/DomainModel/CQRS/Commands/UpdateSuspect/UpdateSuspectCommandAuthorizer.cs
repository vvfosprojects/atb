using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Commands.UpdateSuspect
{
    public class UpdateSuspectCommandAuthorizer : ICommandAuthorizer<UpdateSuspectCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public UpdateSuspectCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public IEnumerable<AuthorizationResult> Authorize(UpdateSuspectCommand command)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
