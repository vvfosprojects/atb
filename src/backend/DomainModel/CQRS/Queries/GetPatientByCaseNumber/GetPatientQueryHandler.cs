using CQRS.Queries;
using DomainModel.Helpers;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Queries.GetPatient
{
    public class GetPatientQueryHandler : IQueryHandler<GetPatientQuery, GetPatientQueryResult>
    {
        private readonly IGetPatientByCaseNumber getPatientByCaseNumber;
        private readonly SubjectHash subjectHash;
        private readonly IGetSessionContext getSessionContext;
        public GetPatientQueryHandler(IGetPatientByCaseNumber getPatientByCaseNumber, SubjectHash subjectHash, IGetSessionContext getSessionContext)
        {
            this.getPatientByCaseNumber = getPatientByCaseNumber ?? throw new ArgumentNullException(nameof(getPatientByCaseNumber));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.subjectHash = subjectHash ?? throw new ArgumentNullException(nameof(subjectHash));
        }

        public GetPatientQueryResult Handle(GetPatientQuery query)
        {
            string group = this.getSessionContext.GetActiveGroup();
            var patient = this.getPatientByCaseNumber.GetPatient(query.CaseNumber, group);

            return new GetPatientQueryResult()
            {
                Patient = this.subjectHash.PatientDecrypt(patient)
            };
        }
    }
}
