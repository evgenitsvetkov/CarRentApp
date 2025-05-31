using System.ComponentModel.DataAnnotations;

namespace CarRent.Core.Models.Car
{
    public class CarDetailsDto: CarDto
    {
        [Display(Name = "Fuel Type")]
        public string FuelType { get; set; } = null!;

        [Display(Name = "Body Type")]
        public string BodyType { get; set; } = null!;
    }
}
