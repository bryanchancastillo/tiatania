using Microsoft.EntityFrameworkCore;
using tiatania.DAL;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Get connection string from configuration
builder.Configuration.AddJsonFile("connectionString.json", optional: true);

builder.Services.AddDbContext<TiataniaContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("TiataniaDatabase"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("TiataniaDatabase"))));


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

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
