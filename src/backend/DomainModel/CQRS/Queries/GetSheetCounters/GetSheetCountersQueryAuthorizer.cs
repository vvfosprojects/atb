using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.GetSheetCounters
{
    public class GetSheetCountersQueryAuthorizer : IQueryAuthorizer<GetSheetCountersQuery, GetSheetCountersQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetSheetCountersQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetSheetCountersQuery query)
        {
            //se non sei loggato errore
            if (! this.getSessionContext.IsLogged())
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }

            if (this.getSessionContext.LoggedUserIsDoctor() && !this.getSessionContext.LoggedUserIsManager() && !this.getSessionContext.LoggedUserIsSupervisor() && this.getSessionContext.GetActiveGroup() != query.Group)
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }
        }
    }
}
