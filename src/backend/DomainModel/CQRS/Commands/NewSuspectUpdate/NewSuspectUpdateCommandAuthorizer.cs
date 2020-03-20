using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Commands.NewSuspectUpdate
{
    public class NewSuspectUpdateCommandAuthorizer : ICommandAuthorizer<NewSuspectUpdateCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public NewSuspectUpdateCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(NewSuspectUpdateCommand command)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
