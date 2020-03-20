using DomainModel.Classes;
using System;

namespace DomainModel.Services
{
    public interface IGetPatientByCaseNumber
    {
        Patient GetPatient(int CaseNumber);
    }
}
