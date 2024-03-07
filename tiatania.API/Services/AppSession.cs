

using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using tiatania.API.Services.Interfaces;
using tiatania.DAL.Models;
using tiatania.API.Models;
using Microsoft.EntityFrameworkCore;
using tiatania.DAL;
using tiatania.API.Services.Interfaces;
//using System.Net.Mail;

namespace tiatania.API.Services;
public class AppSession : IAppSession
{

    public int currentUserId;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly TiataniaContext _context;

    public int CurrentUserId { get => GetCurrentUserId(); }

    public Models.User? CurrentUser { get => GetCurrentUserAsync().Result; }

    public AppSession(IHttpContextAccessor httpContextAccessor, TiataniaContext context)
    {

        _httpContextAccessor = httpContextAccessor;
        _context = context;
        currentUserId = GetCurrentUserId();
    }

    public int GetCurrentUserId()
    {
        return int.Parse(_httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
    }

    public async Task<Models.User?> GetCurrentUserAsync()
    {
        //ur.Active == true && 
        var user = await _context.Users.AsNoTracking().Where(ur => ur.Id == CurrentUserId).Select(ur => new Models.User()
        {

            Id = ur.Id,
            FirstName = ur.FirstName ?? "",
            LastName = ur.LastName ?? "",
            EmailAddress = ur.Email ?? ""

        }).FirstOrDefaultAsync();

        if (user == null)
        {
            user = new Models.User();
           // user.AddError("Failed to get the currrent user. Please authenticate again.", Models.Base.ModelBase.MessageType.Error);
            return user;
        }

        return user;

    }

}