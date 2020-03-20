using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace Logging
{
    public static class LogConfigurator
    {
        public static void Configure(IConfiguration configuration)
        {
            var log = new LoggerConfiguration()
                //.WriteTo.File("log.txt", rollingInterval: RollingInterval.Day, rollOnFileSizeLimit: true)
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            Log.Logger = log;

            Log.Debug("Log configured");
        }
    }
}