using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.GetCSV
{
    public class GetCSVQueryAuthorizer : IQueryAuthorizer<GetCSVQuery, GetCSVQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetCSVQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetCSVQuery query)
        {
            //se non sei loggato errore
            if (! this.getSessionContext.IsLogged())
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }

            //se sei un dottore o un supervisor e non sei un manager errore
            if ((this.getSessionContext.LoggedUserIsDoctor() || this.getSessionContext.LoggedUserIsSupervisor()) && !this.getSessionContext.LoggedUserIsManager())
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }

            //se sei un manager e hai un gruppo errore
            if (this.getSessionContext.LoggedUserIsManager() && !string.IsNullOrEmpty(this.getSessionContext.GetActiveGroup()))
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }
        }
    }
}
