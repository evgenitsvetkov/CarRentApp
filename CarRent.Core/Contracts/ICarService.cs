using CarRent.Core.Models.Car;
using CarRent.Infrastructure.Data.Common;

namespace CarRent.Core.Contracts
{
    public interface ICarService
    {
        Task<IEnumerable<CarDTO>> GetAllCarsAsync();

        Task<bool> CarExistAsync(int carId);

        Task<int> CreateCarAsync(CarFormDTO createDto);

        Task<bool> CategoryExistsAsync(int categoryId);

        Task<IEnumerable<string>> AllCategoriesNamesAsync();

        Task EditCarAsync(int carId, CarFormDTO createDto);

        Task DeleteCarAsync(int carId);

        Task<CarDTO> GetCarDetailsById(int carId);
    }
}
