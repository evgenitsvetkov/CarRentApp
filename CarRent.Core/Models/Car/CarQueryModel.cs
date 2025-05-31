using CarRent.Core.Enumerations;

namespace CarRent.Core.Models.Car
{
    public class CarQueryModel
    {
        public int CarsPerPage { get; set; } = 6;

        public string? Category { get; set; }

        public string? SearchTerm { get; set; }

        public CarSorting Sorting { get; set; }

        public int CurrentPage { get; set; } = 1;

        public int TotalCarsCount { get; set; }

        public IEnumerable<string>? Categories { get; set; }

        public IEnumerable<CarDto> Cars { get; set; } = new List<CarDto>();
    }
}
