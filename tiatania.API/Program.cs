using Microsoft.EntityFrameworkCore;
using tiatania.DAL;
using Microsoft.AspNetCore.Identity;
using tiatania.DAL.Models;
using Newtonsoft.Json;
using System.Net;
using tiatania.API.Services.Interfaces;
using tiatania.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuraci?n de servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuraci?n de la base de datos
builder.Configuration.AddJsonFile("connectionString.json", optional: true);
builder.Services.AddDbContext<TiataniaContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("TiataniaDatabase"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("TiataniaDatabase")))
);

// Configuraci?n de Identity
builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<Role>()
    .AddEntityFrameworkStores<TiataniaContext>();

// Agregar servicio de sesi?n de aplicaci?n
builder.Services.AddTransient<IAppSession, AppSession>();

// Configuraci?n de Razor Pages
builder.Services.AddRazorPages();

var app = builder.Build();

// Middleware y configuraci?n de la aplicaci?n
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    endpoints.MapRazorPages();

    endpoints.MapControllers();

    endpoints.MapFallbackToFile("/index.html");
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();