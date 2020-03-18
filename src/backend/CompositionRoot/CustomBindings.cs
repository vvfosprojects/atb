using System;
using Microsoft.Extensions.Configuration;
using SimpleInjector;

namespace CompositionRoot
{
    /// <summary>
    /// This class contains all the custom application bindings.
    /// </summary>
    internal static class CustomBindings
    {
        internal static void Bind(Container container, IConfiguration Configuration)
        {
            var appConfSection = Configuration.GetSection("appConf");

            container.Register<DomainModel.Services.IJwtEncoder>(() =>
            {
                var jwtDuration_sec = Convert.ToInt32(appConfSection["jwtDuration_sec"]);
                var jwtSecret = appConfSection["jwtSecret"];

                return new JwtStuff.JwtEncoder(jwtSecret, new TimeSpan(0, 0, jwtDuration_sec));
            }, Lifestyle.Singleton);
        }
    }
}