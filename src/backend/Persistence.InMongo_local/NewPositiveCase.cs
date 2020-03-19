using DomainModel.Classes;
using DomainModel.CQRS.Commands.AddPatientCommand;
using DomainModel.Services;
using DomainModel.Services.Users;

namespace Persistence.InMongo_local
{
    internal class NewPositiveCase : INewPositiveCase
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;
        private readonly IGetSessionContext getSessionContext;

        public NewPositiveCase(DbContext dbContext, ICryptools cryptools, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext;
            this.cryptools = cryptools;
            this.getSessionContext = getSessionContext;
        }

        public void Add(NewPositiveCaseCommand command)
        {

            Patient patient = new Patient()
            {
                Data = new Anagrafica()
                {
                    Nome = cryptools.Encrypt(command.Name),
                    Cognome = cryptools.Encrypt(command.Surname),
                    Email = cryptools.Encrypt(command.Email),
                    Number = command.Number,
                    Phone = cryptools.Encrypt(command.Phone),
                    Role = cryptools.Encrypt(command.Role)
                },
                Group = getSessionContext.GetActiveGroup(),
            };
            dbContext.Patients.InsertOne(patient);
        }
    }
}
