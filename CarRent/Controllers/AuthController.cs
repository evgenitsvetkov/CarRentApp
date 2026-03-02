using CarRent.Core.Contracts;
using CarRent.Core.Models.User;
using CarRent.Infrastructure.Data.Models.CustomUser;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> Register(UserDto request)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            var user = await authService.RegisterAsync(request);

            if (user == null)
            {
                return Conflict("This username already exist.");
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto request)
        {
            var result = await authService.LoginAsync(request);

            if (result == null)
            {
                return BadRequest("Invalid username or password.");
            }

            Response.Cookies.Append(
                "refreshToken",
                result.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Path = "/",
                    MaxAge = TimeSpan.FromDays(7)
                });
            var date = DateTime.UtcNow.AddDays(7);
            return Ok(new { accessToken = result.AccessToken });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out string? refreshToken))
            {
                return Unauthorized();
            }

            var result = await authService.RefreshTokensAsync(refreshToken);

            if (result == null || result.AccessToken == null || result.RefreshToken == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            Response.Cookies.Append(
                "refreshToken",
                result.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Path = "/",
                    MaxAge = TimeSpan.FromDays(7)
                });

            return Ok(new { accessToken = result.AccessToken });
        }
    }
}
