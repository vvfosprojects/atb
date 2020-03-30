using CQRS.Queries;
using DomainModel.Services;
using System;

namespace DomainModel.CQRS.Queries.GetAllSuspect
{
    public class GetAllSuspectSheetsQueryHandler : IQueryHandler<GetAllSuspectSheetsQuery, GetAllSuspectSheetsQueryResult>
    {
        private readonly IGetAllSuspectSheets getAllSuspectSheets;

        public GetAllSuspectSheetsQueryHandler(IGetAllSuspectSheets getAllSuspectSheets)
        {
            this.getAllSuspectSheets = getAllSuspectSheets ?? throw new ArgumentNullException(nameof(getAllSuspectSheets));
        }

        public GetAllSuspectSheetsQueryResult Handle(GetAllSuspectSheetsQuery query)
        {
            return new GetAllSuspectSheetsQueryResult()
            {
                Suspects = this.getAllSuspectSheets.Get()
            };
        }
    }
}
