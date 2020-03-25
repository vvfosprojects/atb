using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.Helpers;
using DomainModel.Services;
using DomainModel.Services.Users;

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
            this.getAllSheetsByGroup = getAllSheetsByGroup;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
            this.subjectHash = subjectHash;
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
