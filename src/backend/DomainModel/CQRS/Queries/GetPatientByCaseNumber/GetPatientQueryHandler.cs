using CQRS.Queries;
using DomainModel.Services;

namespace DomainModel.CQRS.Queries.GetPatient
{
    public class GetPatientQueryHandler : IQueryHandler<GetPatientQuery, GetPatientQueryResult>
    {
        private readonly IGetPatientByCaseNumber getPatientByCaseNumber;
        public GetPatientQueryHandler(IGetPatientByCaseNumber getPatientByCaseNumber)
        {
            this.getPatientByCaseNumber = getPatientByCaseNumber;
        }

        public GetPatientQueryResult Handle(GetPatientQuery query)
        {
            return new GetPatientQueryResult()
            {
                Patient = this.getPatientByCaseNumber.GetPatient(query.CaseNumber)
            };
        }

    }
}
