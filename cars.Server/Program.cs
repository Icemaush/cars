using cars.Server.BackgroundServices;
using cars.Server.Broadcasting;
using cars.Server.Interfaces;
using cars.Server.Repositories;
using Microsoft.AspNetCore.Http.Connections;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSignalR();

builder.Services.AddHostedService<CarRegistrationCheck>();

builder.Services.AddCors();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<ICarRepository, CarRepository>();


var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors(
        options => options.WithOrigins("*").AllowAnyMethod()
    );
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.MapHub<RegistrationCheckHub>("/registration-check", o => { o.Transports = HttpTransportType.WebSockets; });

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
