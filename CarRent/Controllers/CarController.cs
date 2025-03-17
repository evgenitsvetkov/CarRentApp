using CarRent.Core.Contracts;
using CarRent.Core.Models.Car;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ICarService carService;

        public CarController(ICarService _carService)
        {
                carService = _carService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetCars()
        {
            var cars = await carService.GetAllCarsAsync();
            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CarDTO>> GetCar(int id)
        {
            if (await carService.CarExistAsync(id) == false)
            {
                return NotFound();
            }

            var car = await carService.GetCarDetailsById(id);

            return Ok(car);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, CarFormDTO editedCarDto)
        {
            if (await carService.CarExistAsync(id) == false)
            {
                return NotFound();
            }

            //ModelState.IsValid 

            await carService.EditCarAsync(id, editedCarDto);

            var editedCar = await carService.GetCarDetailsById(id);
            
            return Ok(editedCar);
        }

        [HttpPost]
        public async Task<IActionResult> PostCar(CarFormDTO carDto)
        {
            if (await carService.CategoryExistsAsync(carDto.CategoryId) == false)
            {
                ModelState.AddModelError(nameof(carDto.CategoryId), "Category not found!");
            }

            //ModelState.IsValid 

            var newCarId = await carService.CreateCarAsync(carDto);
            
            return RedirectToAction(nameof(GetCar), new { id = newCarId });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            if (await carService.CarExistAsync(id) == false)
            {
                return NotFound();
            }

            await carService.DeleteCarAsync(id);

            return NoContent();
        }
    }
}
