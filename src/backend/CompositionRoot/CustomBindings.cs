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
        internal static void Bind(Container container, IConfiguration configuration)
        {
            var appConfSection = configuration.GetSection("appConf:tokenManagement");

            container.Register<DomainModel.Services.IJwtEncoder>(() =>
            {
                var jwtDuration_sec = Convert.ToInt32(appConfSection["accessExpiration"]);
                var jwtSecret = appConfSection["secret"];
                var jwtIssuer = appConfSection["issuer"];

                return new JwtStuff.JwtEncoder(jwtSecret, jwtIssuer, new TimeSpan(0, 0, jwtDuration_sec));
            }, Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.Users.IGetUserByUsername,
                DomainModel.Services.Users.GetUserByUsername_Fake>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.Users.IGetLoggedUser,
                JwtStuff.GetLoggedUser>(Lifestyle.Scoped);

            container.Register<Persistence.InMongo_local.DbContext>(() =>
            {
                var configurationString = configuration.GetSection("ConnectionString").Value;
                var databaseName = configuration.GetSection("DatabaseName").Value;
                return new Persistence.InMongo_local.DbContext(configurationString, databaseName);
            }, Lifestyle.Singleton);

            BindDb_InMongo_local(container);
        }

        private static void BindDb_InMongo_local(Container container)
        {
            container.Register<DomainModel.Services.INewPositiveCase, Persistence.InMongo_local.NewPositiveCase>();
            container.Register<DomainModel.Services.INewPositiveUpdate, Persistence.InMongo_local.NewPositiveUpdate>();
            container.Register<DomainModel.Services.INewSuspect, Persistence.InMongo_local.NewSuspect>();
            container.Register<DomainModel.Services.INewSuspectUpdate, Persistence.InMongo_local.NewSuspectUpdate>();

        }
    }
}