using CQRS.Queries;
using DomainModel.Services;

namespace DomainModel.CQRS.Queries.GetCSV
{
    public class GetCSVQueryHandler : IQueryHandler<GetCSVQuery, GetCSVQueryResult>
    {
        private readonly IGetCSV getCSV;

        public GetCSVQueryHandler(IGetCSV getCSV)
        {
            this.getCSV = getCSV;
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
