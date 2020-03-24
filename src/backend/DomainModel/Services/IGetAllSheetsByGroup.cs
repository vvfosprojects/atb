using DomainModel.Classes;
using DomainModel.CQRS.Queries.GetSheetsByGroup;

namespace DomainModel.Services
{
    public interface IGetAllSheetsByGroup
    {
        AllSheets Get(string group);
    }
}
