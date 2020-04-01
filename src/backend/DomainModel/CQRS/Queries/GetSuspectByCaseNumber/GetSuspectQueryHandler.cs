using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.Helpers;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Queries.GetSuspect
{
    public class GetSuspectQueryHandler : IQueryHandler<GetSuspectQuery, GetSuspectQueryResult>
    {
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;
        private readonly SubjectHash subjectHash;
        private readonly IGetSessionContext getSessionContext;
        public GetSuspectQueryHandler(IGetSuspectByCaseNumber getSuspectByCaseNumber, IGetSessionContext getSessionContext, SubjectHash subjectHash)
        {
            this.getSuspectByCaseNumber = getSuspectByCaseNumber ?? throw new ArgumentNullException(nameof(getSuspectByCaseNumber));
            this.subjectHash = subjectHash ?? throw new ArgumentNullException(nameof(subjectHash));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public GetSuspectQueryResult Handle(GetSuspectQuery query)
        {
            Suspect suspect = this.getSuspectByCaseNumber.GetSuspect(query.CaseNumber, query.Group);

            return new GetSuspectQueryResult()
            {
                Suspect = subjectHash.SuspectDecrypt(suspect)
            };
        }
    }
}
