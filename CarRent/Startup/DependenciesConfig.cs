using CarRent.Infrastructure.Data;
using CarRent.Infrastructure.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Startup
{
    public static class DependenciesConfig
    {
        public static void AddDependencies(this WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<CarRentDbContext>(options =>
            options.UseSqlServer(connectionString));

            builder.Services.AddScoped<IRepository, Repository>();

            builder.Services.AddControllers();
            builder.Services.AddOpenApiServices();
        }
    }
}
