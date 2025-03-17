using CarRent.Core.Contracts;
using CarRent.Core.Models.Car;
using CarRent.Infrastructure.Data.Common;
using CarRent.Infrastructure.Data.Models.Cars;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Core.Services
{
    public class CarService : ICarService
    {
        private readonly IRepository repository;

        public CarService(IRepository _repository)
        {
                repository = _repository;
        }

        public async Task<IEnumerable<CarDTO>> GetAllCarsAsync()
        {
            return await repository.AllReadOnly<Car>()
                .Select(x => new CarDTO()
                {
                    Id = x.Id,
                    Make = x.Make,
                    Model = x.Model,
                    Category = x.Category.Name,
                    BodyType = x.BodyType,
                    FuelType = x.FuelType,
                    Price = x.Price,
                    SeatsNumber = x.SeatsNumber,
                    Year = x.Year,
                    ImageURL = x.ImageURL
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> AllCategoriesNamesAsync()
        {
            return await repository.AllReadOnly<Category>()
                .Select(x => x.Name)
                .Distinct()
                .ToListAsync();
        }

        public async Task<CarDTO> GetCarDetailsById(int carId)
        {
            return await repository.AllReadOnly<Car>()
                .Where(c => c.Id == carId)
                .Select(c => new CarDTO()
            {
                    Id = c.Id,
                    Make = c.Make,
                    Model = c.Model,
                    Category = c.Category.Name,
                    BodyType = c.BodyType,
                    FuelType = c.FuelType,
                    Price = c.Price,
                    SeatsNumber = c.SeatsNumber,
                    Year = c.Year,
                    ImageURL = c.ImageURL 
            }).FirstAsync();
        }

        public async Task<bool> CarExistAsync(int carId)
        {
            return await repository.AllReadOnly<Car>()
                .AnyAsync(c => c.Id == carId);
        }

        public async Task<bool> CategoryExistsAsync(int categoryId)
        {
            return await repository.AllReadOnly<Category>()
                .AnyAsync(c => c.Id == categoryId);
        }

        public async Task<int> CreateCarAsync(CarFormDTO createDto)
        {
            Car car = new Car()
            {
                Make = createDto.Make,
                Model = createDto.Model,
                Year = createDto.Year,
                Price = createDto.Price,
                BodyType = createDto.BodyType,
                FuelType = createDto.FuelType,
                CategoryId = createDto.CategoryId,
                SeatsNumber = createDto.SeatsNumber,
                ImageURL = createDto.ImageURL,
            };

            await repository.AddAsync(car);
            await repository.SaveChangesAsync();

            return car.Id;
        }

        public async Task DeleteCarAsync(int carId)
        {
            await repository.DeleteAsync<Car>(carId);
            await repository.SaveChangesAsync();
        }

        public async Task EditCarAsync(int carId, CarFormDTO createDto)
        {
            var car = await repository.All<Car>()
                .FirstOrDefaultAsync(c => c.Id == carId);

            if (car != null)
            {
                car.Make = createDto.Make;
                car.Model = createDto.Model;
                car.Year = createDto.Year;
                car.Price = createDto.Price;
                car.BodyType = createDto.BodyType;
                car.FuelType = createDto.FuelType;
                car.CategoryId = createDto.CategoryId;
                car.SeatsNumber = createDto.SeatsNumber;
                car.ImageURL = createDto.ImageURL;

                await repository.SaveChangesAsync();
            }                
        }
    }
}
