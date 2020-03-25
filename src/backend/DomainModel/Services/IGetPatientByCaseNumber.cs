using DomainModel.Classes;

namespace DomainModel.Services
{
    public interface IGetPatientByCaseNumber
    {
        Patient GetPatient(int CaseNumber, string group);
    }
}
