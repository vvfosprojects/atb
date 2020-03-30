using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.CQRS.Queries.GetSuspect;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetSuspectByCaseNumber
{
    public class GetSuspectQueryAuthorizer : IQueryAuthorizer<GetSuspectQuery, GetSuspectQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetSuspectQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetSuspectQuery query)
        {
            if (!getSessionContext.LoggedUserIsDoctor() || !getSessionContext.LoggedUserIsSupervisor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
