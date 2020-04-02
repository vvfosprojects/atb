using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.GetNews
{
    public class GetNewsQueryAuthorizer : IQueryAuthorizer<GetNewsQuery, GetNewsQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetNewsQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetNewsQuery query)
        {
            //se non sei loggato errore
            if (!this.getSessionContext.IsLogged())
            {
                yield return new AuthorizationResult("Unauthorized");
                yield break;
            }
        }
    }
}
