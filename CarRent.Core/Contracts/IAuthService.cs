using CarRent.Core.Models.User;
using CarRent.Infrastructure.Data.Models.CustomUser;

namespace CarRent.Core.Contracts
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto request);

        Task<TokenResponseDto?> LoginAsync(UserDto request);

        Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto requestToken); 
    }
}
