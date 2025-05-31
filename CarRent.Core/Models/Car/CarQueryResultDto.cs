namespace CarRent.Core.Models.Car
{
    public class CarQueryResultDto
    {
        public int TotalCarsCount { get; set; }

        public IEnumerable<CarDto> Cars { get; set; } = new List<CarDto>();
    }
}
