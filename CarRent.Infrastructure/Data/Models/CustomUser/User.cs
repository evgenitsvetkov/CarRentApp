using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CarRent.Infrastructure.Data.Models.CustomUser
{
    public class User
    {
        [Key]
        [Comment("User's identifier")]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Comment("User's username")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Comment("User's hashed password")]
        public string PasswordHash { get; set; } = string.Empty;

        [Comment("User's role")]
        public string Role { get; set; } = string.Empty;

        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
