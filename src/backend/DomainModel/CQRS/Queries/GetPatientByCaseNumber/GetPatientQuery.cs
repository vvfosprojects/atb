using CQRS.Queries;

namespace DomainModel.CQRS.Queries.GetPatient
{
    public class GetPatientQuery : IQuery<GetPatientQueryResult>
    {
        /// <summary>
        /// Rappresenta l'identificativo del paziente
        /// </summary>
        public int CaseNumber { get; set; }

        public string Group { get; set; }
    }
}
