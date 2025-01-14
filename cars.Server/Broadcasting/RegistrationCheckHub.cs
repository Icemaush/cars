using Microsoft.AspNetCore.SignalR;

namespace cars.Server.Broadcasting
{
    public class RegistrationCheckHub : Hub
    {
        public async Task SendRegistrationUpdate()
        {
            await Clients.All.SendAsync("UpdateRegistrationStatus");
        }
    }
}
