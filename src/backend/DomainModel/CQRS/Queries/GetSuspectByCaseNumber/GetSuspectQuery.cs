using CQRS.Queries;

namespace DomainModel.CQRS.Queries.GetSuspect
{
    public class GetSuspectQuery : IQuery<GetSuspectQueryResult>
    {
        /// <summary>
        /// Rappresenta l'identificativo del paziente
        /// </summary>
        public int CaseNumber { get; set; }
    }
}
