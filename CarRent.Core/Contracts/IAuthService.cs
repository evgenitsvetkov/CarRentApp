using CarRent.Core.Models.User;
using CarRent.Infrastructure.Data.Models.CustomUser;

namespace CarRent.Core.Contracts
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto request);

        Task<string?> LoginAsync(UserDto request);
    }
}
