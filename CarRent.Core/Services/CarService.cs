using CarRent.Core.Contracts;
using CarRent.Core.Enumerations;
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

        public async Task<CarQueryResultDto> GetAllCarsAsync(
            string? category = null,
            string? searchTerm = null,
            CarSorting sorting = CarSorting.Newest,
            int currentPage = 1,
            int carsPerPage = 1)
        {
            var carsToShow = repository.AllReadOnly<Car>();

            if (category != null)
            {
                carsToShow = carsToShow
                    .Where(m => m.Category.Name == category);
            }

            if (searchTerm != null)
            {
                string normalizedSearchTerm = searchTerm.ToLower();
                carsToShow = carsToShow
                    .Where(c => (c.Make.ToLower().Contains(normalizedSearchTerm) ||
                                c.Model.ToLower().Contains(normalizedSearchTerm)));
            }

            carsToShow = sorting switch
            {
                CarSorting.LowestPrice => carsToShow.OrderBy(m => m.Price),
                CarSorting.HighestPrice => carsToShow.OrderByDescending(m => m.Price),
                CarSorting.Oldest => carsToShow.OrderBy(m => m.Id),
                _ => carsToShow.OrderByDescending(m => m.Id),
            };

            var cars = await carsToShow
                .Skip((currentPage - 1) * carsPerPage)
                .Take(carsPerPage)
                .Select(x => new CarDto()
                {
                    Id = x.Id,
                    Make = x.Make,
                    Model = x.Model,
                    Category = x.Category.Name,
                    Price = x.Price,
                    SeatsNumber = x.SeatsNumber,
                    Year = x.Year,
                    ImageURL = x.ImageURL
                })
                .ToListAsync();

            int totalCars = await carsToShow.CountAsync();

            return new CarQueryResultDto()
            {
                Cars = cars,
                TotalCarsCount = totalCars,
            };
        }

        public async Task<IEnumerable<string>> AllCategoriesNamesAsync()
        {
            return await repository.AllReadOnly<Category>()
                .Select(x => x.Name)
                .Distinct()
                .ToListAsync();
        }

        public async Task<CarDetailsDto> GetCarDetailsByIdAsync(int carId)
        {
            return await repository.AllReadOnly<Car>()
                .Where(c => c.Id == carId)
                .Select(c => new CarDetailsDto()
                {
                    Id = c.Id,
                    Make = c.Make,
                    Model = c.Model,
                    Category = c.Category.Name,
                    Price = c.Price,
                    SeatsNumber = c.SeatsNumber,
                    Year = c.Year,
                    ImageURL = c.ImageURL, 
                    FuelType = c.FuelType,
                    BodyType = c.BodyType
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

        public async Task<int> CreateCarAsync(CarFormDto createDto)
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

        public async Task EditCarAsync(int carId, CarFormDto createDto)
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

        public async Task<IEnumerable<CategoryDto>> AllCategoriesAsync()
        {
            return await repository.AllReadOnly<Category>()
                .Select(c => new CategoryDto()
                {
                    Id = c.Id,
                    Name = c.Name,
                }).ToListAsync();
        }
    }
}
