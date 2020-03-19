using CQRS.Queries;
using DomainModel.Services;

namespace DomainModel.CQRS.Queries.GetSuspect
{
    public class GetSuspectQueryHandler : IQueryHandler<GetSuspectQuery, GetSuspectQueryResult>
    {
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;
        public GetSuspectQueryHandler(IGetSuspectByCaseNumber getSuspectByCaseNumber)
        {
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
        }

        public GetSuspectQueryResult Handle(GetSuspectQuery query)
        {
            return new GetSuspectQueryResult()
            {
                Suspect = this.getSuspectByCaseNumber.GetSuspect(query.CaseNumber)
            };
        }
    }
}
