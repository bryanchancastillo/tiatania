using System;
using System.Collections.Generic;

namespace tiatania.dal.Models;

public partial class Menu
{
    public int MenuId { get; set; }

    public int MenuTypeId { get; set; }

    public string Name { get; set; } = null!;

    public int Price { get; set; }

    public string ImagePath { get; set; } = null!;

    public bool Active { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedOn { get; set; }

    public int UpdatedBy { get; set; }

    public DateTime UpdatedOn { get; set; }

    public virtual ReferenceMenuType MenuType { get; set; } = null!;
}
