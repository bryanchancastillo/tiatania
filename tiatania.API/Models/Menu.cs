using Microsoft.AspNetCore.Mvc;
using tiatania.API.Models.Base;

namespace tiatania.API.Models
{
    public class Menu : ModelBase
    {
      public int MenuId { get; set; }

      public int MenuTypeId { get; set; }

      public string Name { get; set; }

      public int Price { get; set; }

      public string? ImagePath { get; set; }

        
        [FromForm]

        public IFormFile? File { get; set; }

    }
}
