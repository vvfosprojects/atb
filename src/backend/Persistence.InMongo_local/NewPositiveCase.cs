using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
using DomainModel.CQRS.Commands.AddPatientCommand;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;

namespace Persistence.InMongo_local
{
    internal class NewPositiveCase : INewPositiveCase
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;
        private readonly IGetSessionContext getSessionContext;

        public NewPositiveCase(DbContext dbContext, ICryptools cryptools, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Add(NewPositiveCaseCommand command)
        {
            Patient patient = new Patient()
            {
                Subject = new Anagrafica()
                {
                    Nome = cryptools.Encrypt(command.Name),
                    Cognome = cryptools.Encrypt(command.Surname),
                    Email = cryptools.Encrypt(command.Email),
                    Number = command.Number.Value,
                    Phone = cryptools.Encrypt(command.Phone),
                    Role = cryptools.Encrypt(command.Role)
                },
                Group = getSessionContext.GetActiveGroup(),
            };

            try
            {
                dbContext.Patients.InsertOne(patient);
            }
            catch
            {
                throw new AtbApplicationException("Inserimento fallito. Numero del caso già esistente?.");
            }
        }
    }
}