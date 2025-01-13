using cars.Server.Models;
using cars.Server.SearchFilters.Cars;

namespace cars.Server.Interfaces
{
    public interface ICarRepository
    {
        List<Car> GetAll(CarsQueryObject query);

        Car? GetById(int id);
    }
}
