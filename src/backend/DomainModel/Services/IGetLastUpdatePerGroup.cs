using DomainModel.CQRS.Queries.GetLastUpdatePerGroup;

namespace DomainModel.Services
{
    public interface IGetLastUpdatePerGroup
    {
        string GenerateCSV(GetLastUpdatePerGroupQuery query);
    }
}
