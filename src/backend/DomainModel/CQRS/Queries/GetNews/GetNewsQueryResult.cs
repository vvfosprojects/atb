using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetNews
{
    public class GetNewsQueryResult
    {
        public List<Object> News { get; set; }
    }
}
