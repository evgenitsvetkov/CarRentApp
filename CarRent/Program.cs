using CarRent.Startup;

var builder = WebApplication.CreateBuilder(args);

builder.AddDependencies();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseOpenApi();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowClientApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
