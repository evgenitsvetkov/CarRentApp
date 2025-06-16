using CarRent.Core.Contracts;
using CarRent.Core.Models.User;
using CarRent.Infrastructure.Data.Models.CustomUser;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService _authService)
        {
            authService = _authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            var user = await authService.RegisterAsync(request);

            if (user == null)
            {
                return BadRequest("Username already exists.");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var token = await authService.LoginAsync(request);

            if (token == null)
            {
                return BadRequest("Invalid username or password.");
            }

            return Ok(token);
        }

    }
}
