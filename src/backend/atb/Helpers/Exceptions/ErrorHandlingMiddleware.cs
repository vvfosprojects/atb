using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace atb.Helpers.Exceptions
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected
            var result = JsonConvert.SerializeObject(new { error = "Server error" });

            if (ex is DomainModel.Classes.Exceptions.AtbNotFoundException) code = HttpStatusCode.NotFound;
            else if (ex is CQRS.Authorization.AuthorizationException) code = HttpStatusCode.Unauthorized;
            else if (ex is CQRS.Validation.ValidationException) code = HttpStatusCode.BadRequest;
            else if (ex is DomainModel.Classes.Exceptions.AtbApplicationException) code = HttpStatusCode.BadRequest;

            if (code != HttpStatusCode.InternalServerError)
            {
                Log.Debug(ex, "Exception handled.");
                result = JsonConvert.SerializeObject(new { error = ex.Message });
            }
            else
                Log.Error(ex, "Application error");

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }
    }
}