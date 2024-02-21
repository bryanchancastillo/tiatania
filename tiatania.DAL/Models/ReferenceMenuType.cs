using System;
using System.Collections.Generic;

namespace tiatania.DAL.Models;

public partial class ReferenceMenuType
{
    public int MenuTypeId { get; set; }

    public string Code { get; set; } = null!;

    public bool Active { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedOn { get; set; }

    public int UpdatedBy { get; set; }

    public DateTime UpdatedOn { get; set; }

    public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();
}
