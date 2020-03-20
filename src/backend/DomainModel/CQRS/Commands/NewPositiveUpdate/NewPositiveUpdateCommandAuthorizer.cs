using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.NewPositiveUpdate
{
    public class NewPositiveUpdateCommandAuthorizer : ICommandAuthorizer<NewPositiveUpdateCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public NewPositiveUpdateCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(NewPositiveUpdateCommand command)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
