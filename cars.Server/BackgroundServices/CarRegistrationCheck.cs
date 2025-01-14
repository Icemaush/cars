
using cars.Server.Broadcasting;
using cars.Server.Classes;
using cars.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace cars.Server.BackgroundServices
{
    public class CarRegistrationCheck(ILogger<CarRegistrationCheck> logger, IHubContext<RegistrationCheckHub> registrationCheckHub) : BackgroundService
    {
        private readonly ILogger<CarRegistrationCheck> _logger = logger;
        private readonly IHubContext<RegistrationCheckHub> _registrationCheckHub = registrationCheckHub;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Random random = new();

            List<Car> cars = Cars.GetCarsFromJson();
            string[] statuses = ["Valid", "Expired"];

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Sending registration update");

                /*
                 * Call to external API would go here to check car registration status.
                 * This is to simulate the check on a car's registration and provide a realtime 
                 * update to the frontend using SignalR.
                 */

                int randomCarIndex = random.Next(0, cars.Count);
                Car randomCar = cars[randomCarIndex];

                int randomStatusIndex = random.Next(0, statuses.Length);
                string randomStatus = statuses[randomStatusIndex];

                await _registrationCheckHub.Clients.All.SendAsync("UpdateRegistrationStatus", randomCar.Id, randomStatus);
                await Task.Delay(3000);
            }
        }
    }
}
