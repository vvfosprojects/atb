using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetStatistics
{
    class GetStatisticsQueryAuthorizer : IQueryAuthorizer<GetStatisticsQuery, GetStatisticsQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetStatisticsQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetStatisticsQuery query)
        {
            if (!getSessionContext.LoggedUserIsManager())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
