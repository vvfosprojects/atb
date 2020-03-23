using DomainModel.CQRS.Queries.GetCSV;

namespace DomainModel.Services
{
    public interface IGetCSV
    {
        string GenerateCSV(GetCSVQuery query);
    }
}
