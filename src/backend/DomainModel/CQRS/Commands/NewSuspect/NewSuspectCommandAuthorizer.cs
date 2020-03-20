using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewSuspectCommandAuthorizer : ICommandAuthorizer<NewSuspectCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public NewSuspectCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(NewSuspectCommand command)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
