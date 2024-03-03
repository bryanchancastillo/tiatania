using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tiatania.API.Models;
using tiatania.DAL;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;


namespace tiatania.API.Controllers
{
    [ApiController]
    [Route("API/Menus")]
    public class MenuController : ControllerBase
    {

        private readonly TiataniaContext _context;
        private readonly IAppSession _appSession;

        public MenuController(TiataniaContext context, IAppSession _appSession)
        {
            _context = context;
            _appSession = appSession;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Menu>> Get()
        {

            try
            {

                var menu = _context.Menus.AsNoTracking().Where(m => m.Active).Select(m => new Menu()
                {
                    
                    MenuId = m.MenuId,
                    MenuTypeId = m.MenuTypeId,
                    Name = m.Name,
                    Price = m.Price,
                    ImagePath = m.ImagePath,
    
                }).ToList();

                return menu;
                
            }
            catch (Exception ex)
            {
                
                ///Add exception
            }

            return new List<Menu>();

        }

        [Authorize]
        [HttpPost("Create")]
        public ActionResult Create(Menu model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var menu = _context.Menus.FirstOrDefault(m => m.MenuId == model.MenuId
                && m.MenuTypeId == model.MenuTypeId && m.Active) ??
                new DAL.Models.Menu()
                {

                };

            menu.MenuTypeId = model.MenuTypeId;
            menu.Name = model.Name;
            menu.ImagePath = model.ImagePath;
            menu.Active = true;
            menu.CreatedBy = 1;
            menu.CreatedOn = DateTime.Now;
            menu.UpdatedBy = 1;
            menu.UpdatedOn = DateTime.UtcNow;

            _context.Menus.Add(menu);
            _context.SaveChanges();

            model.MenuId = menu.MenuId;
            return new JsonResult(new { Message = "Succesfully created a new Menu item.", Modal = model });

        }


    }
}
