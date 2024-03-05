
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using tiatania.DAL;
using tiatania.API.Models;

namespace tiatania.API.Controllers;

[Authorize]
[ApiController]
[Route("API/Authentications")]
public class AuthenticationController : ControllerBase
{

    private readonly SignInManager<tiatania.DAL.Models.User> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly TiataniaContext _context;
    private readonly UserManager<DAL.Models.User> _userManager;

    public AuthenticationController(SignInManager<tiatania.DAL.Models.User> signInManager, IConfiguration configuration, TiataniaContext context, UserManager<DAL.Models.User> userManager)
    {
        _signInManager = signInManager;
        _configuration = configuration;
        _context = context;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpGet("AuthenticatedUser")]
    public async Task<User> AuthenticatedUser()
    {

        User user = new User();

        try
        {
            if (HttpContext.User.Identity == null || !HttpContext.User.Identity.IsAuthenticated)
            {
                // user.AddError("You are not authorized to access this resource. Please Authenticate.");
                return user;
            }

            int currentUserId = 0;
            int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out currentUserId);

            // Obtener información del usuario, incluyendo roles
            var currentUser = await _userManager.FindByIdAsync(currentUserId.ToString());

            if (currentUser == null)
            {
                // user.AddError("Couldn't find the authenticated user. Please logout and log back in.");
                return user;
            }

            // Mapear la información del usuario al objeto User
            user.Id = currentUser.Id;
            user.EmailAddress = currentUser.Email ?? "";
            user.EmailConfirmed = currentUser.EmailConfirmed;
            user.FirstName = currentUser.FirstName ?? "";
            user.LastName = currentUser.LastName ?? "";

            // Obtener los nombres de los roles del usuario
            var roles = await _userManager.GetRolesAsync(currentUser);
            user.RolesName = roles.ToArray();


            return user;
        }
        catch (Exception ex)
        {
            // user.AddExceptionError(ex);
            return user;
        }

    }


}

