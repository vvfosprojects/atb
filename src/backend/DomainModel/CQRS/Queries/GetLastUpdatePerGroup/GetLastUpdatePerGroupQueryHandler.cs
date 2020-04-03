using CQRS.Queries;
using DomainModel.Services;
using System;

namespace DomainModel.CQRS.Queries.GetLastUpdatePerGroup
{
    public class GetLastUpdatePerGroupQueryHandler : IQueryHandler<GetLastUpdatePerGroupQuery, GetLastUpdatePerGroupQueryResult>
    {
        private readonly IGetLastUpdatePerGroup getLastUpdatePerGroup;

        public GetLastUpdatePerGroupQueryHandler(IGetLastUpdatePerGroup getLastUpdatePerGroup)
        {
            this.getLastUpdatePerGroup = getLastUpdatePerGroup ?? throw new ArgumentNullException(nameof(getLastUpdatePerGroup));
        }

        public GetLastUpdatePerGroupQueryResult Handle(GetLastUpdatePerGroupQuery query)
        {
            return new GetLastUpdatePerGroupQueryResult()
            {
                CSV = this.getLastUpdatePerGroup.GenerateCSV(query)
            };
        }
    }
}
