using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.PortfolioBackend.Core.Exceptions;
using System.Net;
using System.Text.Json;

namespace PortfolioBackend.Infrastructure.Middlewares
{
    public class GlobalExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

        public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

            var (statusCode, title, detail) = exception switch
            {
                NotFoundException => (HttpStatusCode.NotFound, "Resource Not Found", exception.Message),
                BadRequestException => (HttpStatusCode.BadRequest, "Bad Request", exception.Message),
                ConflictException => (HttpStatusCode.Conflict, "Conflict", exception.Message),
                UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "Unauthorized", exception.Message),
                _ => (HttpStatusCode.InternalServerError, "Internal Server Error", "An unexpected error occurred.")
            };

            context.Response.ContentType = "application/problem+json";
            context.Response.StatusCode = (int)statusCode;

            var problemDetails = new ProblemDetails
            {
                Status = (int)statusCode,
                Title = title,
                Detail = detail,
                Instance = context.Request.Path
            };

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(problemDetails, options);
            await context.Response.WriteAsync(json);
        }
    }

    public static class GlobalExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
        {
            return app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
        }
    }
}
