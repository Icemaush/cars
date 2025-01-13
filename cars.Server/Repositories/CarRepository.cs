using cars.Server.Classes;
using cars.Server.Interfaces;
using cars.Server.Models;
using cars.Server.SearchFilters.Cars;

namespace cars.Server.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly List<Car> cars;

        public CarRepository()
        {
            cars = Cars.GetCars();
        }

        public List<Car> GetAll(CarsQueryObject query)
        {
            IEnumerable<Car> data = cars.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Make))
            {
                data = data.Where(c => c.Make.Contains(query.Make));
            }

            if (!string.IsNullOrWhiteSpace(query.Model))
            {
                data = data.Where(c => c.Model.Contains(query.Model));
            }


            return data.ToList();
        }

        public Car? GetById(int id)
        {
            return cars.FirstOrDefault(c => c.Id == id);
        }
    }
}
