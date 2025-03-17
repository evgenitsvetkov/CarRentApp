using CarRent.Infrastructure.Data.Models.Cars;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Infrastructure.Data
{
    public class CarRentDbContext : IdentityDbContext<IdentityUser>
    {
        public CarRentDbContext(DbContextOptions<CarRentDbContext> options) : base(options) 
        {

        }

        public DbSet<Car> Cars { get; set; } = null!;

        public DbSet<Category> Categories { get; set; } = null!;
    }
}
