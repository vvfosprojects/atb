using CQRS.Authorization;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetSheetCounters
{
    class GetSheetCountersQueryAuthorizer
    {
        private readonly IGetSessionContext getSessionContext;

        public GetSheetCountersQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetSheetCountersQuery query)
        {
            if (!this.getSessionContext.IsLogged())
                yield return new AuthorizationResult("Unauthorized");

        }
    }
}
