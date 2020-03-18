using DomainModel.Classes;
using DomainModel.CQRS.Commands.AddPatientCommand;
using DomainModel.Services;

namespace Persistence.InMongo_local
{
    internal class NewPositiveCase : INewPositiveCase
    {
        private readonly DbContext dbContext;

        public NewPositiveCase(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Add(NewPositiveCaseCommand command)
        {
            Patient patient = new Patient()
            {
                Data = new Anagrafica()
                {
                    Nome = command.Name,
                    Cognome = command.Surname,
                    Email = command.Email,
                    Number = command.Number,
                    Phone = command.Phone,
                    Role = command.Role
                },
                Group = command.Group,
            };
            dbContext.Patients.InsertOne(patient);
        }
    }
}
