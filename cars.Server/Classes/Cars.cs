using cars.Server.Models;
using System.Text.Json;

namespace cars.Server.Classes
{
    public class Cars
    {
        public static List<Car> GetCarsFromJson()
        {
            string fileName = "cars.json";
            string jsonString = File.ReadAllText(fileName);
            return JsonSerializer.Deserialize<List<Car>>(jsonString);
        }
    }
}
