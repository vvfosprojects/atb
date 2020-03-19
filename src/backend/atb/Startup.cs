using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleInjector;
using Logging;
using Microsoft.Extensions.Hosting;
using System;
using JwtStuff;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace atb
{
    public class Startup
    {
        private readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        private Container container = new SimpleInjector.Container();

        public Startup(IConfiguration configuration)
        {
            // Set to false. This will be the default in v5.x and going forward.
            container.Options.ResolveUnregisteredConcreteTypes = false;

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDataProtection(); // see https://stackoverflow.com/a/43936866/1045789
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            IntegrateJwtTokenManagement(services);

            IntegrateSimpleInjector(services);
        }

        private void IntegrateJwtTokenManagement(IServiceCollection services)
        {
            var token = Configuration.GetSection("appConf:tokenManagement").Get<TokenManagement>();
            var secret = Encoding.ASCII.GetBytes(token.Secret);

            services.AddHttpContextAccessor();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(token.Secret)),
                    ValidIssuer = token.Issuer,
                    ValidAudience = token.Audience,
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    // the following line enables the possibility to read the logged username
                    // ('sub' claim in the JWT token) by reading User.Identity.Name property
                    NameClaimType = ClaimTypes.NameIdentifier
                };
            });
        }

        private void IntegrateSimpleInjector(IServiceCollection services)
        {
            // Sets up the basic configuration that for integrating Simple Injector with ASP.NET
            // Core by setting the DefaultScopedLifestyle, and setting up auto cross wiring.
            services.AddSimpleInjector(container, options =>
            {
                // AddAspNetCore() wraps web requests in a Simple Injector scope and allows
                // request-scoped framework services to be resolved.
                options.AddAspNetCore()

                    // Ensure activation of a specific framework type to be created by Simple
                    // Injector instead of the built-in configuration system. All calls are
                    // optional. You can enable what you need. For instance, PageModels and
                    // TagHelpers are not needed when you build a Web API.
                    .AddControllerActivation()
                    .AddViewComponentActivation();

                // Optionally, allow application components to depend on the non-generic ILogger
                // (Microsoft.Extensions.Logging) or IStringLocalizer
                // (Microsoft.Extensions.Localization) abstractions.
                options.AddLogging();
            });

            InitializeContainer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // see https://simpleinjector.readthedocs.io/en/latest/aspnetintegration.html

            // UseSimpleInjector() finalizes the integration process.
            app.UseSimpleInjector(container);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Add custom middleware
            //app.UseMiddleware<CustomMiddleware1>(container);
            //app.UseMiddleware<CustomMiddleware2>(container);

            LogConfigurator.Configure();

            container.Verify();
        }

        private void InitializeContainer()
        {
            CompositionRoot.RootBindings.Bind(container, Configuration);
        }
    }
}