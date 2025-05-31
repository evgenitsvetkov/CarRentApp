using CarRent.Core.Enumerations;
using CarRent.Core.Models.Car;
using CarRent.Infrastructure.Data.Common;

namespace CarRent.Core.Contracts
{
    public interface ICarService
    {
        Task<CarQueryResultDto> GetAllCarsAsync(
             string? category = null,
            string? searchTerm = null,
            CarSorting sorting = CarSorting.Newest,
            int currentPage = 1,
            int carsPerPage = 1);

        Task<bool> CarExistAsync(int carId);

        Task<int> CreateCarAsync(CarFormDto createDto);

        Task<bool> CategoryExistsAsync(int categoryId);

        Task<IEnumerable<CategoryDto>> AllCategoriesAsync();

        Task<IEnumerable<string>> AllCategoriesNamesAsync();

        Task EditCarAsync(int carId, CarFormDto createDto);

        Task DeleteCarAsync(int carId);

        Task<CarDetailsDto> GetCarDetailsByIdAsync(int carId);
    }
}
