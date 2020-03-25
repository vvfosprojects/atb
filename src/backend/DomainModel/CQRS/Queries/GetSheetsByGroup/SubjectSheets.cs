using System;

namespace DomainModel.CQRS.Queries.GetSheetsByGroup
{
    public class SubjectSheets
    {
        public Object[] Patients { get; set; }
        public Object[] Suspects { get; set; }
    }
}
