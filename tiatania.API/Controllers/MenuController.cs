using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tiatania.API.Models;
using tiatania.DAL;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using tiatania.API.Services.Interfaces;
using tiatania.API.Services;
using tiatania.API.Models.Base;



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
            try
            {


                var existingMenuItem = _context.Menus.FirstOrDefault(m => m.Name == model.Name && m.MenuId != model.MenuId && m.Active == true);

                if (existingMenuItem != null)
                {
                    model.AddFieldError("An active menu with the provided name already exists. Please choose a different name.", "Name", ModelBase.MessageType.Error);
                    return new JsonResult(model);
                }

                var uploadDirectory = _configuration["UploadDirectory"];

                if (!Directory.Exists(uploadDirectory))
                {
                    Directory.CreateDirectory(uploadDirectory);
                }

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

                var total = await _context.SaveChangesAsync();


                if (total > 0)
                {
                    model.MenuId = menu.MenuId;
                    model.AddMessage("Successfully added new menu item.");
                    return new JsonResult(model);

                }

                
            }
            catch (DbUpdateConcurrencyException ex)
            {
                model.AddExceptionError(ex);
            }
            catch (DbUpdateException ex)
            {
                model.AddExceptionError(ex);
            }
            catch (Exception ex)
            {
                model.AddExceptionError(ex);
            }

            model.AddError("The request to create an Employer didn't work as expected.");
            return new JsonResult(model);
        }

        [Authorize]
        [HttpPut("Update")]
        public ActionResult Update(Menu model)
        {

            try
            {

                var menu = _context.Menus.FirstOrDefault(m => m.MenuId == model.MenuId && m.Active == true);

                if (menu == null)
                {
                    model.AddError("Active menu item not found.");
                    return new JsonResult(model);
                }

                var existingMenuItem = _context.Menus.FirstOrDefault(m => m.Name == model.Name && m.MenuId != model.MenuId && m.Active == true);

                if (existingMenuItem != null)
                {
                    model.AddFieldError("An active menu with the provided name already exists. Please choose a different name.", "Name", ModelBase.MessageType.Error);
                    return new JsonResult(model);
                }

                menu.Name = model.Name;
                menu.Price = model.Price;
                menu.UpdatedBy = _appSession.CurrentUserId;
                menu.UpdatedOn = DateTime.UtcNow;

                var total = _context.SaveChanges();

                if (total > 0)
                {
                    model.AddMessage("Successfully updated the active menu item.");
                    return new JsonResult(model);
                }
            }
            catch (Exception ex)
            {
                model.AddExceptionError(ex);
                return new JsonResult(model);
            }

            model.AddError("The request to update the active menu item didn't work as expected.");
            return new JsonResult(model);
        }


        [Authorize]
        [HttpPut("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            var returnModel = new ModelBase();

            try
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

                //menu.ImagePath = ""; // Clear the image path
                menu.Active = false; // Set the active status to false
                menu.UpdatedBy = _appSession.CurrentUserId;
                menu.UpdatedOn = DateTime.UtcNow;

                _context.Menus.Update(menu);
                await _context.SaveChangesAsync();

                returnModel.AddMessage("The menu item has been successfully deleted.");
                return new JsonResult(returnModel);

            }
            catch(Exception ex)
            {
                returnModel.AddExceptionError(ex);
                return new JsonResult(returnModel);
            }
        }

    }

}
