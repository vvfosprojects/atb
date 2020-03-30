using CQRS.Queries;
using DomainModel.Services;
using System;

namespace DomainModel.CQRS.Queries.GetAllPositive
{
    public class GetAllPositiveSheetsQueryHandler : IQueryHandler<GetAllPositiveSheetsQuery, GetAllPositiveSheetsQueryResult>
    {
        private readonly IGetAllPositiveSheets getAllPositiveSheets;

        public GetAllPositiveSheetsQueryHandler (IGetAllPositiveSheets getAllPositiveSheet)
        {
            this.getAllPositiveSheets = getAllPositiveSheet ?? throw new ArgumentNullException(nameof(getAllPositiveSheet));
        }

        public GetAllPositiveSheetsQueryResult Handle(GetAllPositiveSheetsQuery query)
        {
            return new GetAllPositiveSheetsQueryResult()
            {
                Patients = this.getAllPositiveSheets.Get()
            };
        }
    }
}
