using CQRS.Queries;
using DomainModel.Services;
using System;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetNews
{
    public class GetNewsQueryHandler : IQueryHandler<GetNewsQuery, GetNewsQueryResult>
    {
        private readonly IGetNews getNews;
        public GetNewsQueryHandler(IGetNews getNews)
        {
            this.getNews = getNews ?? throw new ArgumentNullException(nameof(getNews)); 
        }

        public GetNewsQueryResult Handle(GetNewsQuery query)
        {
            var newsArray = this.getNews.Get().ToArray();

            var listNews = new List<Object>();

            foreach(var news in newsArray)
            {
                listNews.Add(new 
                { 
                    news.Highlight,
                    news.Text,
                    news.Order
                });
            }

            return new GetNewsQueryResult()
            {
                News = listNews
            };
        }
    }
}
