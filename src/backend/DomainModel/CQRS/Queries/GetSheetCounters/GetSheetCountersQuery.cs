﻿using CQRS.Queries;

namespace DomainModel.CQRS.Queries.GetSheetCounters
{
    public class GetSheetCountersQuery : IQuery<GetSheetCountersQueryResult>
    {
        public string Group { get; set; }
    }
}
