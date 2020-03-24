using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using CQRS.Logging;
using CQRS.Queries;
using Newtonsoft.Json;
using Serilog;

namespace Logging.CQRS
{
    public class QueryHandlerLogDecorator<TQuery, TResult> : IQueryHandler<TQuery, TResult> where TQuery : IQuery<TResult>
    {
        private readonly IQueryHandler<TQuery, TResult> decorated;

        public QueryHandlerLogDecorator(IQueryHandler<TQuery, TResult> decorated)
        {
            this.decorated = decorated ?? throw new ArgumentNullException(nameof(decorated));
        }

        public TResult Handle(TQuery query)
        {
            Type queryType = query.GetType();
            string jsonQuery;
            if (!typeof(IHasCustomAudit).IsAssignableFrom(query.GetType()))
                jsonQuery = JsonConvert.SerializeObject(query);
            else
                jsonQuery = ((IHasCustomAudit)query).SerializeForAudit();
            var sQuerType = queryType.ToString();

            Log.Information("Action starting {queryClass}: {jsonQuery}", sQuerType, jsonQuery);

            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var result = this.decorated.Handle(query);
            stopwatch.Stop();

            var elapsed = stopwatch.ElapsedMilliseconds;

            Log.Information("Action executed ({elapsed} ms)", elapsed);

            return result;
        }
    }
}