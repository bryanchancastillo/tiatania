using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace tiatania.DAL.Models
{
	public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    }
}

