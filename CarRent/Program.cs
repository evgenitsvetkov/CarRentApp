using CarRent.Endpoints;
using CarRent.Startup;

var builder = WebApplication.CreateBuilder(args);

builder.AddDependencies();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("AllowClientApp");

app.UseOpenApi();

app.UseHttpsRedirection();

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.AddRootEndpoints();

app.MapFallbackToFile("/index.html");

await app.RunAsync();
