using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Commands.UpdatePositive
{
    public class UpdatePositiveCommandAuthorizer : ICommandAuthorizer<UpdatePositiveCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public UpdatePositiveCommandAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(UpdatePositiveCommand command)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
