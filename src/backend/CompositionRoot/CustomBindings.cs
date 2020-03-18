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
            // Put here the bindings of your own custom services
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
        }
    }
}