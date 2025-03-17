using System.ComponentModel.DataAnnotations;

namespace CarRent.Core.Models.Car
{
    public class CarFormDTO
    {
        [Required(ErrorMessage = "The {0} field is required")]
        [StringLength(50,
            MinimumLength = 2,
            ErrorMessage = "The field {0} must be between {2} and {1} characters long")]
        public string Make { get; set; } = null!;

        [Required(ErrorMessage = "The {0} field is required")]
        [StringLength(50,
            MinimumLength = 2,
            ErrorMessage = "The field {0} must be between {2} and {1} characters long")]
        public string Model { get; set; } = null!;

        [Required(ErrorMessage = "The {0} field is required")]
        public DateOnly Year { get; set; } 

        [Required(ErrorMessage = "The {0} field is required")]
        [StringLength(10,
            MinimumLength = 3,
            ErrorMessage = "The field {0} must be between {2} and {1} characters long")]
        [Display(Name = "Fuel Type")]
        public string FuelType { get; set; } = null!;

        [Required(ErrorMessage = "The {0} field is required")]
        [Range(typeof(decimal),
            "0",
            "1000",
            ConvertValueInInvariantCulture = true,
            ErrorMessage = "Price must be a positive number and less than {2} leva")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "The {0} field is required")]
        [Range(typeof(int),
            "1",
            "10",
            ErrorMessage = "The field {0} must be between {2} and {1} characters long")]
        [Display(Name = "Seats Number")]
        public int SeatsNumber { get; set; }

        [Required(ErrorMessage = "The {0} field is required")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "The {0} field is required")]
        [StringLength(10,
            MinimumLength = 3,
            ErrorMessage = "The field {0} must be between {2} and {1} characters long")]
        [Display(Name = "Body Type")]
        public string BodyType { get; set; } = null!;

        [Required(ErrorMessage = "The {0} field is required")]
        [Display(Name = "Image URL")]
        public string ImageURL { get; set; } = string.Empty;
    }
}
