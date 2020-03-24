using CQRS.Queries;
using DomainModel.Services.Groups;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainModel.CQRS.Queries.GetGroups
{
    public class GetGroupsQueryHandler : IQueryHandler<GetGroupsQuery, GetGroupsQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;
        private readonly IGetAllGroups getAllGroups;

        public GetGroupsQueryHandler(IGetSessionContext getSessionContext,
            IGetAllGroups getAllGroups)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.getAllGroups = getAllGroups ?? throw new ArgumentNullException(nameof(getAllGroups));
        }

        public GetGroupsQueryResult Handle(GetGroupsQuery query)
        {
            var sessionGroup = this.getSessionContext.GetActiveGroup();
            IDictionary<string, string> result;
            if (!string.IsNullOrWhiteSpace(sessionGroup))
                result = new Dictionary<string, string>() {
                    { sessionGroup, sessionGroup.ToUpper() }
                };
            else
                result = this.getAllGroups.Get()
                    .ToDictionary(g => g, g => g.ToUpper());

            return new GetGroupsQueryResult()
            {
                Groups = result
            };
        }
    }
}