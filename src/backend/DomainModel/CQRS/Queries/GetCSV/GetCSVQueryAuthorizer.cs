using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetCSV
{
    public class GetCSVQueryAuthorizer : IQueryAuthorizer<GetCSVQuery, GetCSVQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetCSVQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        /// <summary>
        /// E' autorizzato solo un utente manager che NON possiede gruppi.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<AuthorizationResult> Authorize(GetCSVQuery query)
        {
            if (!string.IsNullOrWhiteSpace(this.getSessionContext.GetActiveGroup()) && (!this.getSessionContext.LoggedUserIsManager()))
            {
                yield return new AuthorizationResult("Unauthorized");
            }
        }
    }
}
