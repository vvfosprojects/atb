using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.CQRS.Queries.GetSuspect;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetSuspectByCaseNumber
{
    public class GetSuspectQueryAuthorizer : IQueryAuthorizer<GetSuspectQuery, GetSuspectQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetSuspectQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public IEnumerable<AuthorizationResult> Authorize(GetSuspectQuery query)
        {
            //se sono dottore e ho un gruppo diverso allora errore
            if (this.getSessionContext.LoggedUserIsDoctor() && this.getSessionContext.GetActiveGroup() != query.Group)
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }

            //se sono un supervisor e ho un gruppo e voglio un gruppo diverso da quello che ho errore
            if (this.getSessionContext.LoggedUserIsSupervisor() && !string.IsNullOrEmpty(this.getSessionContext.GetActiveGroup()) && this.getSessionContext.GetActiveGroup() != query.Group )
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }

            //se sono un manager errore e non sono un supervisor

            if (this.getSessionContext.LoggedUserIsManager() && !this.getSessionContext.LoggedUserIsSupervisor())
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }
        }
    }
}
