using System.ComponentModel.DataAnnotations;

namespace CarRent.Core.Models.User
{
    public class TokenResponseDto
    {
        public required string AccessToken { get; set; }
        
        public required string RefreshToken { get; set; }
    }
}
