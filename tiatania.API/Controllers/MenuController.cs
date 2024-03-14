using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tiatania.API.Models;
using tiatania.DAL;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using tiatania.API.Services.Interfaces;
using tiatania.API.Services;


namespace tiatania.API.Controllers
{
    [ApiController]
    [Route("API/Menus")]
    public class MenuController : ControllerBase
    {

        private readonly TiataniaContext _context;
        private readonly IAppSession _appSession;
        private readonly IConfiguration _configuration;

        public MenuController(TiataniaContext context, IAppSession appSession, IConfiguration configuration)
        {
            _context = context;
            _appSession = appSession;
            _configuration = configuration;
           
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
            var uploadDirectory = _configuration["UploadDirectory"];

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
            var filePath = Path.Combine(uploadDirectory, fileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                model.File.CopyTo(stream);
            }

            model.ImagePath = fileName;
        
            var menu = _context.Menus.FirstOrDefault(m => m.MenuId == model.MenuId
                && m.MenuTypeId == model.MenuTypeId && m.Active) ??
                new DAL.Models.Menu()
                {

                };

            menu.MenuTypeId = model.MenuTypeId;
            menu.Name = model.Name;
            menu.Price = model.Price;
            menu.ImagePath = model.ImagePath;
            menu.Active = true;
            menu.CreatedBy = _appSession.CurrentUserId;
            menu.CreatedOn = DateTime.Now;
            menu.UpdatedBy = _appSession.CurrentUserId;
            menu.UpdatedOn = DateTime.UtcNow;

            _context.Menus.Add(menu);
            _context.SaveChanges();

            model.MenuId = menu.MenuId;
            return new JsonResult(new { Message = "Succesfully created a new Menu item.", Modal = model });

        }


    }
}
