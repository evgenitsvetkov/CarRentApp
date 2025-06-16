using CarRent.Infrastructure.Data.Models.Cars;
using CarRent.Infrastructure.Data.Models.CustomUser;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Infrastructure.Data
{
    public class CarRentDbContext : DbContext
    {
        public CarRentDbContext(DbContextOptions<CarRentDbContext> options) : base(options) 
        { }

        public DbSet<Car> Cars { get; set; } = null!;

        public DbSet<Category> Categories { get; set; } = null!;

        public DbSet<User> Users { get; set; } = null!;
    }
}
