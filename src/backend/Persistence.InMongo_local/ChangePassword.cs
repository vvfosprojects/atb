using DomainModel.Classes;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence.InMongo_local
{
    internal class ChangePassword : IChangePassword
    {
        private readonly DbContext dbContext;

        public ChangePassword(DbContext dbContex)
        {
            this.dbContext = dbContex ?? throw new ArgumentNullException(nameof(dbContex));
        }

        public void Change(string username, string newPwdHash)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Username, username);
            var update = Builders<User>.Update.Set(p => p.PwdHash, newPwdHash);

            var result = this.dbContext.Users.UpdateOne(filter, update);
            if (result.MatchedCount != 1)
                throw new InvalidOperationException("Unable to update any record.");
        }
    }
}