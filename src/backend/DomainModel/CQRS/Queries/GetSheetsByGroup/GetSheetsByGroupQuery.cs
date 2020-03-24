using CQRS.Queries;

namespace DomainModel.CQRS.Queries.GetSheetsByGroup
{
    public class GetSheetsByGroupQuery : IQuery<GetSheetsByGroupQueryResult>
    {
        public string Group { get; set; }
    }
}
