using Microsoft.EntityFrameworkCore;
using tiatania.DAL;
using Microsoft.AspNetCore.Identity;
using tiatania.DAL.Models;
using Newtonsoft.Json;
using System.Net;
using tiatania.API.Services.Interfaces;
using tiatania.API.Services;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

//Get connection string from configuration
builder.Configuration.AddJsonFile("connectionString.json", optional: true);

builder.Services.AddDbContext<TiataniaContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("TiataniaDatabase"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("TiataniaDatabase"))));

//Identity
builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<Role>()
    .AddEntityFrameworkStores<TiataniaContext>();

// AppSession
builder.Services.AddTransient<IAppSession, AppSession>();

// Razor
builder.Services.AddRazorPages();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapRazorPages();

app.Run();
