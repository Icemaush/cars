using cars.Server.Classes;
using cars.Server.Interfaces;
using cars.Server.Models;
using cars.Server.SearchFilters.Cars;
using Microsoft.AspNetCore.Mvc;

namespace cars.Server.Controllers
{
    [Route("api/cars")]
    [ApiController]
    public class CarController(ICarRepository carRepository) : ControllerBase
    {
        private readonly ICarRepository _carRepository = carRepository;

        [HttpGet]
        public ActionResult<List<Car>> GetCars([FromQuery] CarsQueryObject query)
        {
            return Ok(_carRepository.GetAll(query));
        }

        [HttpGet("{id}")]
        public ActionResult<List<Car>> GetCar(int id)
        {
            var car = _carRepository.GetById(id);

            if (car is null)
                return NotFound();

            return Ok(car);
        }
    }
}
