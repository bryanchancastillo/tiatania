using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tiatania.API.Models;
using tiatania.DAL;

namespace tiatania.API.Controllers
{
    [ApiController]
    [Route("API/Menus")]
    public class MenuController : ControllerBase
    {

        private readonly TiataniaContext _context;

        public MenuController(TiataniaContext context)
        {
            _context = context;
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


    }
}
