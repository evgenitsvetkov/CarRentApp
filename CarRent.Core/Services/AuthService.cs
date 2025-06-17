using CarRent.Core.Contracts;
using CarRent.Core.Models.User;
using CarRent.Infrastructure.Data.Common;
using CarRent.Infrastructure.Data.Models.CustomUser;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarRent.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository repository;
        private readonly IConfiguration configuration;
        
        public AuthService(IRepository _repository, IConfiguration _configuration)
        {
            repository = _repository;
            configuration = _configuration;
        }

        public async Task<string?> LoginAsync(UserDto request)
        {
            var user = await repository.AllReadOnly<User>()
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return null;
            }

            var hashedPasswordResult = new PasswordHasher<User>()
                .VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (hashedPasswordResult == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return CreateToken(user);
        }

        public async Task<User?> RegisterAsync(UserDto request)
        {
            var isUserExist = await repository.AllReadOnly<User>()
                .AnyAsync(u => u.Username == request.Username);

            if (isUserExist)
            {
                return null;
            }

            var newUser = new User();
            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(newUser, request.Password);

            newUser.Username = request.Username;
            newUser.PasswordHash = hashedPassword;

            await repository.AddAsync(newUser);
            await repository.SaveChangesAsync();

            return newUser;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));
         
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
