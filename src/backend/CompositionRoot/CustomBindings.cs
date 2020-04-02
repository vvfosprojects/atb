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

            container.Register<DomainModel.Services.Users.IJwtEncoder>(() =>
            {
                var jwtDuration_sec = Convert.ToInt32(tokenManagementSection["accessExpiration"]);
                var jwtSecret = tokenManagementSection["secret"];
                var jwtIssuer = tokenManagementSection["issuer"];

                return new JwtStuff.JwtEncoder(jwtSecret, jwtIssuer, new TimeSpan(0, 0, jwtDuration_sec));
            }, Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.Users.IGetUserByUsername,
                Persistence.InMongo_local.GetUserByUsername>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.Users.IGetSessionContext,
                JwtStuff.GetSessionContext>(Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.ICryptools>(() =>
                {
                    return new CryptoStuff.Cryptools(appConfSection["dataEncryptionKey"]);
                }, Lifestyle.Singleton);

            container.Register<
                DomainModel.Services.Users.IChangePassword,
                Persistence.InMongo_local.ChangePassword>(Lifestyle.Scoped);

            container.Register<
                DomainModel.Services.Groups.IGetAllGroups,
                Persistence.InMongo_local.GetAllGroups>(Lifestyle.Scoped);

            container.Register<Persistence.InMongo_local.DbContext>(() =>
            {
                var configurationString = configuration.GetSection("mongoDbSettings:connectionString").Value;
                var databaseName = configuration.GetSection("mongoDbSettings:databaseName").Value;
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
            container.Register<DomainModel.Services.Statistics.IGetStatistics, Persistence.InMongo_local.GetStatistics>();
            container.Register<DomainModel.Services.IGetCSV, Persistence.InMongo_local.GetCSV>();
            container.Register<DomainModel.Services.IGetNextPositiveCaseNumber, Persistence.InMongo_local.GetNextPositiveCaseNumber>();
            container.Register<DomainModel.Services.IGetNextSuspectCaseNumber, Persistence.InMongo_local.GetNextSuspectCaseNumber>();
            container.Register<DomainModel.Services.IGetAllSheetsByGroup, Persistence.InMongo_local.GetAllSheetsByGroup>();
            container.Register<DomainModel.Services.Statistics.IGetAllSheetsStats, Persistence.InMongo_local.GetAllSheetsStats>();
            container.Register<DomainModel.Helpers.SubjectHash>(Lifestyle.Scoped);
            container.Register<DomainModel.Services.IGetNews, Persistence.InMongo_local.GetNews>();
            container.Register<DomainModel.Services.IUpdateSuspect, Persistence.InMongo_local.UpdateSuspect>();
            container.Register<DomainModel.Services.IUpdatePositive, Persistence.InMongo_local.UpdatePositive>();
            container.Register<DomainModel.Services.IKeepAlive, Persistence.InMongo_local.KeepAliveInsert>();
        }
    }
}