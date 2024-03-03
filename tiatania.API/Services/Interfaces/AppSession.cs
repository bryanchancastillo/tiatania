using tiatania.API.Models;

namespace tiatania.API.Services.Interfaces
{
    public interface IAppSession
    {
        int CurrentUserId { get; }

        int GetCurrentUserId();

        User CurrentUser { get; }

        Task<User?> GetCurrentUserAsync();

    }
}