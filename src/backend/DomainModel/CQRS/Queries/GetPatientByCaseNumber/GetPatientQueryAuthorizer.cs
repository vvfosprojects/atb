using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.CQRS.Queries.GetPatient;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetPatientByCaseNumber
{
    public class GetPatientQueryAuthorizer : IQueryAuthorizer<GetPatientQuery, GetPatientQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetPatientQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public IEnumerable<AuthorizationResult> Authorize(GetPatientQuery query)
        {
            //se sono dottore ed ho il giusto gruppo, tutto ok
            if (this.getSessionContext.LoggedUserIsDoctor() && this.getSessionContext.GetActiveGroup() == query.Group)
            {
                yield break;
            }

            //se sono un supervisor ed ho gruppo vuoto o giusto, tutto ok
            if (this.getSessionContext.LoggedUserIsSupervisor() &&
                (string.IsNullOrEmpty(this.getSessionContext.GetActiveGroup()) || (this.getSessionContext.GetActiveGroup() == query.Group)))
            {
                yield break;
            }

            //nei restanti casi non sono autorizzato.
            yield return new AuthorizationResult("Unauthorized");
        }
    }
}