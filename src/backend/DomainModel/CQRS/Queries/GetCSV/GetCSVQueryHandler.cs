using CQRS.Queries;
using DomainModel.Services;
using System;

namespace DomainModel.CQRS.Queries.GetCSV
{
    public class GetCSVQueryHandler : IQueryHandler<GetCSVQuery, GetCSVQueryResult>
    {
        private readonly IGetCSV getCSV;

        public GetCSVQueryHandler(IGetCSV getCSV)
        {
            this.getCSV = getCSV ?? throw new ArgumentNullException(nameof(getCSV));
        }

        public GetCSVQueryResult Handle(GetCSVQuery query)
        {
            return new GetCSVQueryResult()
            {
                CSV = this.getCSV.GenerateCSV(query)
            };
        }
    }
}
