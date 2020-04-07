using DomainModel.Classes;
using DomainModel.CQRS.Commands.NewPositiveUpdate;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    public class NewPositiveUpdate : INewPositiveUpdate
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;

        public NewPositiveUpdate(DbContext dbContex, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContex ?? throw new ArgumentNullException(nameof(dbContex));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Add(NewPositiveUpdateCommand command)
        {
            var loggedUser = this.getSessionContext.GetLoggedUsername();
            if (command.Link != null)
            {
                var dataToInsert = new PositiveData()
                {
                    EstremiProvvedimentiASL = command.EstremiProvvedimentiASL,
                    ActualWorkReturnDate = command.ActualWorkReturnDate,
                    ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                    QuarantinePlace = command.QuarantinePlace,
                    DiseaseConfirmDate = command.DiseaseConfirmDate,
                    UpdatedBy = loggedUser,
                    UpdateTime = DateTime.UtcNow,
                    Link = new Link()
                    {
                        CaseNumber = command.Link.CaseNumber,
                        Closed = command.Link.Closed
                    }
                };
                var filter = Builders<Patient>.Filter.Eq(x => x.Subject.Number, command.CaseNumber) & Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
                var update = Builders<Patient>.Update.Push(p => p.Data, dataToInsert);
                dbContext.Patients.UpdateOne(filter, update);
            }
            else
            {
                var dataToInsert = new PositiveData()
                {
                    EstremiProvvedimentiASL = command.EstremiProvvedimentiASL,
                    ActualWorkReturnDate = command.ActualWorkReturnDate,
                    ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                    QuarantinePlace = command.QuarantinePlace,
                    DiseaseConfirmDate = command.DiseaseConfirmDate,
                    UpdatedBy = loggedUser,
                    UpdateTime = DateTime.UtcNow,
                    Link = null
                };
                var filter = Builders<Patient>.Filter.Eq(x => x.Subject.Number, command.CaseNumber) & Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
                var update = Builders<Patient>.Update.Push(p => p.Data, dataToInsert);
                dbContext.Patients.UpdateOne(filter, update);
            }

           
        }
    }
}