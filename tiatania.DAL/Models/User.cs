using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace tiatania.DAL.Models
{
	public class User : IdentityUser<int>
    {

        [MaxLength(25)]
		public string? FirstName { get; set; }

        [MaxLength(25)]
        public string? LastName { get; set; }

        public bool Active { get; set; } = true;

        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public int UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();

    }
}

