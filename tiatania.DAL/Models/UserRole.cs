using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace tiatania.DAL.Models
{
	public class UserRole : IdentityUserRole<int>
    {
        public bool Active { get; set; } = true;

        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public int UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public virtual User User { get; set; } = null!;

        public virtual Role Role { get; set; } = null!;
    }
}

