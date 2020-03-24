using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetSheetsByGroup
{
    public class GetSheetsByGroupQueryHandler : IQueryHandler<GetSheetsByGroupQuery, GetSheetsByGroupQueryResult>
    {
        private readonly IGetAllSheetsByGroup getAllSheetsByGroup;
        private readonly IGetSessionContext getSessionContext;
        private readonly ICryptools cryptools;

        public GetSheetsByGroupQueryHandler(IGetAllSheetsByGroup getAllSheetsByGroup, IGetSessionContext getSessionContext, ICryptools cryptools)
        {
            this.getAllSheetsByGroup = getAllSheetsByGroup;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
        }

        public GetSheetsByGroupQueryResult Handle(GetSheetsByGroupQuery query)
        {
            //if (! this.getSessionContext.GetActiveGroup().Contains(query.Group) || ! string.IsNullOrEmpty(this.getSessionContext.GetActiveGroup()))
            //{
            //    throw new Exception("Unathorized");
            //}
            
            AllSheets collections = this.getAllSheetsByGroup.Get(query.Group);
            List<Patient> plainTPatients = new List<Patient>();
            List<Suspect> plainTSuspects = new List<Suspect>();


            foreach (var patient in collections.Patients)
            {
                plainTPatients.Add(new Patient()
                {
                    Group = patient.Group,
                    Subject = new Anagrafica()
                    {
                        Number = patient.Subject.Number,
                        Nome = this.cryptools.Decrypt(patient.Subject.Nome),
                        Cognome = this.cryptools.Decrypt(patient.Subject.Cognome),
                        Email = this.cryptools.Decrypt(patient.Subject.Email),
                        Phone = this.cryptools.Decrypt(patient.Subject.Phone),
                        Role = this.cryptools.Decrypt(patient.Subject.Role)
                    },
                    Data = patient.Data
                });
            }

            foreach (var suspect in collections.Suspects)
            {
                plainTSuspects.Add(new Suspect()
                {
                    Group = suspect.Group,
                    Subject = new Anagrafica()
                    {
                        Number = suspect.Subject.Number,
                        Nome = this.cryptools.Decrypt(suspect.Subject.Nome),
                        Cognome = this.cryptools.Decrypt(suspect.Subject.Cognome),
                        Email = this.cryptools.Decrypt(suspect.Subject.Email),
                        Phone = this.cryptools.Decrypt(suspect.Subject.Phone),
                        Role = this.cryptools.Decrypt(suspect.Subject.Role)
                    },
                    Data = suspect.Data
                });
            }

            return new GetSheetsByGroupQueryResult()
            {
                AllSheets = new AllSheets()
                {
                    Patients = plainTPatients,
                    Suspects = plainTSuspects
                }
            };
        }
    }
}
