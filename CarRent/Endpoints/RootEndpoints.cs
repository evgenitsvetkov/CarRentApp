namespace CarRent.Endpoints
{
    public static class RootEndpoints
    {
        public static void AddRootEndpoints(this WebApplication app)
        {
            app.MapFallbackToFile("/index.html");

            app.MapGet("/", () => "Hello World");
        }
    }
}
