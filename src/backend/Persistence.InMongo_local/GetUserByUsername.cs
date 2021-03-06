﻿using DomainModel.Classes;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    public class GetUserByUsername : IGetUserByUsername
    {
        private readonly DbContext dbContext;

        public GetUserByUsername(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public User Get(string username)
        {
            var lowercaseUsername = username.ToLower();
            var filter = Builders<User>.Filter.Eq(x => x.Username, lowercaseUsername) & Builders<User>.Filter.Eq(x => x.Enabled, true);

            return dbContext.Users.Find(filter).Single();
        }
    }
}