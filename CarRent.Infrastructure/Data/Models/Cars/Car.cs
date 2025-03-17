using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRent.Infrastructure.Data.Models.Cars
{
    public class Car
    {
        [Key]
        [Comment("Car's identifier")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Comment("Car's make")]
        public string Make { get; set; } = null!;
        
        [Required]
        [MaxLength(50)]
        [Comment("Car's model")]
        public string Model { get; set; } = null!;

        [Required]
        [Comment("Car's year of production")]
        public DateOnly Year { get; set; }

        [Required]
        [MaxLength(10)]
        [Comment("Car's fuel type")]
        public string FuelType { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [Comment("Car's rental price")]
        public decimal Price { get; set; }

        [Required]
        [MaxLength(10)]
        [Comment("Car's number of seats")]
        public int SeatsNumber { get; set; }

        [Required]
        [Comment("Car's category identifier")]
        public int CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        [Comment("Car's category")]
        public Category Category { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        [Comment("Car's body type")]
        public string BodyType { get; set; } = null!;

        [Required]
        [Comment("Car's image url")]
        public string ImageURL { get; set; } = string.Empty;
    }
}
