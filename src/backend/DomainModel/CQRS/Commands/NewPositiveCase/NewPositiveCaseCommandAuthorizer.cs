using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Commands.NewPositiveCase
{
    public class NewPositiveCaseCommandAuthorizer : ICommandAuthorizer<NewPositiveCaseCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public NewPositiveCaseCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(NewPositiveCaseCommand command)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
