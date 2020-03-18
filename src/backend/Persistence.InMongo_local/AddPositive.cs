using atb.Helper;
using DomainModel.Classes;
using DomainModel.CQRS.Commands.AddPatientCommand;
using DomainModel.Services;

namespace Persistence.InMongo_local
{
    internal class AddPositive : IAddPositive
    {
        private readonly DbContext dbContext;

        public AddPositive(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Add(NewPositiveCommand command)
        {
            var loggedUser = new GetLoggedUser_fake();

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
