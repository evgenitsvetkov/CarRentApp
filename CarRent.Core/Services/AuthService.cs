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
using System.Security.Cryptography;
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

        public async Task<TokenResponseDto?> LoginAsync(UserDto request)
        {
            var user = await repository.All<User>()
                .FirstOrDefaultAsync(u => u.Username.ToLower() == request.Username.ToLower());

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

            return await CreateTokenResponse(user);
        }

        public async Task<User?> RegisterAsync(UserDto request)
        {
            var isUserExist = await repository.AllReadOnly<User>()
                .AnyAsync(u => u.Username.ToLower() == request.Username.ToLower());

            if (isUserExist)
            {
                return null;
            }

            var newUser = new User();
            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(newUser, request.Password);

            newUser.Username = request.Username.ToLower();
            newUser.PasswordHash = hashedPassword;

            await repository.AddAsync(newUser);
            await repository.SaveChangesAsync();

            return newUser;
        }

        public async Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto requestToken)
        {
            var user = await ValidateRefreshTokenAsync(requestToken.UserId, requestToken.RefreshToken);

            if (user == null)
            {
                return null;
            }

            return await CreateTokenResponse(user);
        }

        private async Task<TokenResponseDto> CreateTokenResponse(User user)
        {
            return new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user)
            };
        }

        private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var user = await repository.GetByIdAsync<User>(userId);

            if (user == null 
                || user.RefreshToken != refreshToken 
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await repository.SaveChangesAsync();

            return refreshToken;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var generateRandomNum = RandomNumberGenerator.Create(); 
            generateRandomNum.GetBytes(randomNumber);

            return Convert.ToBase64String(randomNumber);
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
