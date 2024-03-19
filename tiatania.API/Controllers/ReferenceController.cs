using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tiatania.API.Models;
using tiatania.DAL;

namespace tiatania.API.Controllers;
[ApiController]
[Route("API/References")]
public class ReferenceController : ControllerBase
{

    private readonly TiataniaContext _context;

    public ReferenceController(TiataniaContext context)
    {
        _context = context;
    }

    [HttpGet("MenuTypes")]
    public ActionResult<IEnumerable<Reference>> getMenuTypes()
    {
        try
        {

            var menuTypeReferenceValues = _context.ReferenceMenuTypes.AsNoTracking().Where(menu => menu.Active == true).Select(menu => new Reference()
            {

                ReferenceId = menu.MenuTypeId,
                Code = menu.Code

            }).ToList();

            return menuTypeReferenceValues;



        }
        catch (Exception ex)
        {
            /*Once the model implement the interface
             * add the necessary info here for errors
             */
        }


        return new List<Reference>();
    }

}

