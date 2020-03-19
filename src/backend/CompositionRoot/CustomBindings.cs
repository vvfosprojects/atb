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
            var appConfSection = configuration.GetSection("appConf");
            var tokenManagementSection = appConfSection.GetSection("tokenManagement");

            container.Register<DomainModel.Services.IJwtEncoder>(() =>
            {
                var jwtDuration_sec = Convert.ToInt32(tokenManagementSection["accessExpiration"]);
                var jwtSecret = tokenManagementSection["secret"];
                var jwtIssuer = tokenManagementSection["issuer"];

                return new JwtStuff.JwtEncoder(jwtSecret, jwtIssuer, new TimeSpan(0, 0, jwtDuration_sec));
            }, Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.Users.IGetUserByUsername,
                DomainModel.Services.Users.GetUserByUsername_Fake>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.Users.IGetSessionContext,
                JwtStuff.GetSessionContext>(Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.ICryptools>(() =>
                {
                    var provider = container.GetInstance<Microsoft.AspNetCore.DataProtection.IDataProtectionProvider>();
                    return new CryptoStuff.Cryptools(provider, appConfSection["dataEncryptionKey"]);
                }, Lifestyle.Singleton);

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
            container.Register<DomainModel.Services.IGetPatientByCaseNumber, Persistence.InMongo_local.GetPatientByCaseNumber>();
            container.Register<DomainModel.Services.IGetSuspectByCaseNumber, Persistence.InMongo_local.GetSuspectByCaseNumber>();
            container.Register<DomainModel.Services.IGetAllPositiveSheets, Persistence.InMongo_local.GetAllPositiveSheets>();
            container.Register<DomainModel.Services.IGetAllSuspectSheets, Persistence.InMongo_local.GetAllSuspectSheets>();
        }
    }
}