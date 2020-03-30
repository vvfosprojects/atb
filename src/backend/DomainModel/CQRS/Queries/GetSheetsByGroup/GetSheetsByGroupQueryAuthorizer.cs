using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using Serilog;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetSheetsByGroup
{
    public class GetSheetsByGroupQueryAuthorizer : IQueryAuthorizer<GetSheetsByGroupQuery, GetSheetsByGroupQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetSheetsByGroupQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetSheetsByGroupQuery query)
        {
            if (!this.getSessionContext.IsLogged() || this.getSessionContext.LoggedUserIsManager())
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }

            // se l'utente ha un gruppo e non è quello che sta chiedendo
            if (!string.IsNullOrWhiteSpace(this.getSessionContext.GetActiveGroup()) && (this.getSessionContext.GetActiveGroup() != query.Group))
            {
                Log.Warning("Probabile attacco.");
                yield return new AuthorizationResult("Unauthorized");
            }
        }
    }
}
