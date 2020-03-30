using DomainModel.CQRS.Queries.GetNews;
using DomainModel.Services;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.InMongo_local
{
    internal class GetNews : IGetNews
    {
        private readonly DbContext dbContext;

        public GetNews(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public List<News> Get()
        {
            return this.dbContext.News.AsQueryable().OrderByDescending(x => x.Order).ToList();
        }
    }
}
