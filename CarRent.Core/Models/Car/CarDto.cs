﻿using System.ComponentModel.DataAnnotations;

namespace CarRent.Core.Models.Car
{
    public class CarDto
    {
        public int Id { get; set; }

        public string Make { get; set; } = null!;

        public string Model { get; set; } = null!;

        public DateOnly Year { get; set; }

        [Range(typeof(decimal),
            "0",
            "1000",
            ConvertValueInInvariantCulture = true,
            ErrorMessage = "Price must be a positive number and less than {2} leva")]
        public decimal Price { get; set; }

        [Display(Name = "Seats Number")]
        public int SeatsNumber { get; set; }

        public string Category { get; set; } = null!;

        [Display(Name = "Image URL")]
        public string ImageURL { get; set; } = string.Empty;
    }
}
