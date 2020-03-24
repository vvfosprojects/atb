using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using CQRS.Commands;
using CQRS.Logging;
using Newtonsoft.Json;
using Serilog;

namespace Logging.CQRS
{
    public class CommandHandlerLogDecorator<TCommand> : ICommandHandler<TCommand>
    {
        private readonly ICommandHandler<TCommand> decorated;

        public CommandHandlerLogDecorator(ICommandHandler<TCommand> decorated)
        {
            this.decorated = decorated ?? throw new ArgumentNullException(nameof(decorated));
        }

        public void Handle(TCommand command)
        {
            Type queryType = command.GetType();
            string jsonCommand;
            if (!typeof(IHasCustomAudit).IsAssignableFrom(command.GetType()))
                jsonCommand = JsonConvert.SerializeObject(command);
            else
                jsonCommand = ((IHasCustomAudit)command).SerializeForAudit();
            var sCommandType = queryType.ToString();

            Log.Information("Action starting {commandClass}: {jsonCommand}", sCommandType, jsonCommand);

            var stopwatch = new Stopwatch();
            stopwatch.Start();
            this.decorated.Handle(command);
            stopwatch.Stop();

            var elapsed = stopwatch.ElapsedMilliseconds;

            Log.Information("Action executed ({elapsed} ms)", elapsed);
        }
    }
}