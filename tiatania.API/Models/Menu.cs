namespace tiatania.API.Models
{
    public class Menu
    {
      public int MenuId { get; set; }

      public int MenuTypeId { get; set; }

      public string Name { get; set; } = null!;

      public int Price { get; set; }

      public string ImagePath { get; set; } = null!;
    }
}
