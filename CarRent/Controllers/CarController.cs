using CarRent.Core.Contracts;
using CarRent.Core.Models.Car;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static CarRent.Core.Constants.RoleConstants;

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
        public async Task<ActionResult<CarQueryModel>> GetCars([FromQuery]CarQueryModel query)
        {
            var result = await carService.GetAllCarsAsync(
                query.Category,
                query.SearchTerm,
                query.Sorting,
                query.CurrentPage,
                query.CarsPerPage);

            query.TotalCarsCount = result.TotalCarsCount;
            query.Cars = result.Cars;
            query.Categories = await carService.AllCategoriesNamesAsync();

            return Ok(query);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CarDetailsDto>> GetCar(int id)
        {
            if (await carService.CarExistAsync(id) == false)
            {
                return NotFound();
            }

            var carModel = await carService.GetCarDetailsByIdAsync(id);

            return Ok(carModel);
        }

        [Authorize(Roles = AdminRole)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, CarFormDto carModel)
        {
            if (await carService.CarExistAsync(id) == false)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await carService.EditCarAsync(id, carModel);

            return NoContent();
        }

        [Authorize(Roles = AdminRole)]
        [HttpPost]
        public async Task<ActionResult<CarDetailsDto>> PostCar(CarFormDto carModel)
        {
            if (await carService.CategoryExistsAsync(carModel.CategoryId) == false)
            {
                ModelState.AddModelError(nameof(carModel.CategoryId), "Category not found!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCarId = await carService.CreateCarAsync(carModel);
            var newCarModel = await carService.GetCarDetailsByIdAsync(newCarId);
            
            return CreatedAtAction(nameof(GetCar), new { id = newCarId }, newCarModel);
        }

        [Authorize(Roles = AdminRole)]
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

        [HttpGet("Categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await carService.AllCategoriesAsync();

            return Ok(categories);
        }
    }
}
