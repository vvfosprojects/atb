using DomainModel.Classes;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.GetAllPositive
{
    public class GetAllPositiveSheetsQueryResult
    {
        public IEnumerable<Patient> Patients { get; set; }
    }
}
