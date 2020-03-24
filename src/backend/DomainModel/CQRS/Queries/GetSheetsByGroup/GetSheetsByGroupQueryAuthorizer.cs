using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

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
           if (string.IsNullOrEmpty(this.getSessionContext.GetLoggedUsername()))
                yield return new AuthorizationResult("Unauthorized");
            else if (this.getSessionContext.LoggedUserIsDoctor() && this.getSessionContext.GetActiveGroup() != query.Group)
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}

