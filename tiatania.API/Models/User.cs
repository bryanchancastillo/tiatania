using System;

namespace tiatania.API.Models
{

    public class AllUsersResult 
    {
        public IEnumerable<User> Users { get; set; } = new List<User>();
    }

    public class User
    {

        public int? Id { get; set; }

        public string EmailAddress { get; set; } = string.Empty;

        public bool? EmailConfirmed { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string[] RolesName { get; set; } = new string[0];


    }


}

