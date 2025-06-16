using System.ComponentModel.DataAnnotations;

namespace CarRent.Core.Models.User
{
    public class UserDto
    {
        [Required(ErrorMessage = "The {0} field is required")]
        [StringLength(50,
            MinimumLength = 5,
            ErrorMessage = "The field {0} must be between {2} and {1} characters long")]
        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
