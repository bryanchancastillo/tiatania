using Microsoft.AspNetCore.Mvc;

namespace tiatania.API.Models
{
    public class Menu
    {
      public int MenuId { get; set; }

      public int MenuTypeId { get; set; }

      public string Name { get; set; }

      public int Price { get; set; }

      public string ImagePath { get; set; } = null!;


      [FromForm]
      public IFormFile File { get; set; } = null!;


    }
}
