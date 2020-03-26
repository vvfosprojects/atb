using DomainModel.Classes;

namespace DomainModel.Services
{
    public interface IGetSuspectByCaseNumber
    {
        Suspect GetSuspect(int CaseNumber, string group);
    }
}
