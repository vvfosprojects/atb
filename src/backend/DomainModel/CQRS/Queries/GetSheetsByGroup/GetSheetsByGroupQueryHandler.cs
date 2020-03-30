using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.Helpers;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Queries.GetSheetsByGroup
{
    public class GetSheetsByGroupQueryHandler : IQueryHandler<GetSheetsByGroupQuery, GetSheetsByGroupQueryResult>
    {
        private readonly IGetAllSheetsByGroup getAllSheetsByGroup;
        private readonly IGetSessionContext getSessionContext;
        private readonly ICryptools cryptools;
        private readonly SubjectHash subjectHash;

        public GetSheetsByGroupQueryHandler(IGetAllSheetsByGroup getAllSheetsByGroup, IGetSessionContext getSessionContext, ICryptools cryptools, SubjectHash subjectHash)
        {
            this.getAllSheetsByGroup = getAllSheetsByGroup ?? throw new ArgumentNullException(nameof(getAllSheetsByGroup));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.subjectHash = subjectHash ?? throw new ArgumentNullException(nameof(subjectHash));
        }

        public GetSheetsByGroupQueryResult Handle(GetSheetsByGroupQuery query)
        {
            AllSheets collections = this.getAllSheetsByGroup.Get(query.Group);
            
            foreach (var p in collections.Patients)
            {
                this.subjectHash.PatientDecrypt(p);
            }

            foreach(var s in collections.Suspects)
            {
                this.subjectHash.SuspectDecrypt(s);
            }

            return new GetSheetsByGroupQueryResult()
            {
                AllSheets = collections
            };
        }
    }
}
