using DomainModel.Classes;
using DomainModel.CQRS.Commands.NewSuspectCommand;
using DomainModel.Services;

namespace Persistence.InMongo_local
{
    public class NewSuspect : INewSuspect
    {
        private readonly DbContext dbContext;

        public NewSuspect(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Add(NewSuspectCommand command)
        {
            Suspect suspect = new Suspect()
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
            dbContext.Suspects.InsertOne(suspect);
        }
    }
}
