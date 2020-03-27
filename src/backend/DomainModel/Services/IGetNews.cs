using DomainModel.CQRS.Queries.GetNews;
using System.Collections.Generic;

namespace DomainModel.Services
{
    public interface IGetNews
    {
        List<News> Get();
    }
}
