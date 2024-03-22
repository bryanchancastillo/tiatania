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
        [HttpGet("{id}")]
        public ActionResult<Menu> Get(int id)
        {
            try
            {
                var menu = _context.Menus.AsNoTracking().Where(m => m.Active == true && m.MenuId == id).Select(r => new Menu()
                {
                    MenuTypeId = r.MenuTypeId,
                    MenuId = r.MenuId,
                    Name = r.Name,
                    Price = r.Price,
                    ImagePath = r.ImagePath,

                }).FirstOrDefault();

                if (menu != null)
                    return menu;
            }
            catch (Exception ex)
            {
            }

            return new Menu();
        }

        [Authorize]
        [HttpPost("Create")]
        public async Task<ActionResult> Create(Menu model)
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
                new DAL.Models.Menu();

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

            await _context.SaveChangesAsync();

            model.MenuId = menu.MenuId;
            return new JsonResult(new { Message = "Successfully created a new Menu item.", Modal = model });
        }


        [Authorize]
        [HttpPut("Update")]
        public ActionResult Update(Menu model)
        {
            try
            {

                var menu = _context.Menus.FirstOrDefault(m => m.MenuId == model.MenuId);

                if (menu == null)
                {
                    return new JsonResult("The specified RecruitmentEffort does not exist.");
                }

                menu.Name = model.Name;
                menu.Price = model.Price;
                menu.UpdatedBy = _appSession.CurrentUserId;
                menu.UpdatedOn = DateTime.UtcNow;

                var total = _context.SaveChanges();

                if (total > 0)
                    return new JsonResult(new { Message = "Successfully updated the menu item.", Modal = model });

            }

            catch (Exception ex)
            {
                return new JsonResult(string.Format("[{0},{1}]", ex.Message, ex.InnerException?.Message));
            }

            return new JsonResult("This didn't work as expected.");

        }

        [Authorize]
        [HttpPut("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var menu = _context.Menus.FirstOrDefault(menu => menu.MenuId == id && menu.Active);

            if (menu == null)
            {
                return NotFound();
            }

            var uploadDirectory = _configuration["UploadDirectory"];
            var filePath = Path.Combine(uploadDirectory, menu.ImagePath);

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            menu.ImagePath = ""; // Clear the image path
            menu.Active = false; // Set the active status to false
            menu.UpdatedBy = _appSession.CurrentUserId;
            menu.UpdatedOn = DateTime.UtcNow;

            _context.Menus.Update(menu);
            await _context.SaveChangesAsync();

            return new JsonResult(new { Message = "Successfully deleted the image and set active status to false.", Modal = menu });
        }

    }

}
