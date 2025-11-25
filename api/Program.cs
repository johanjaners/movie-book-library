using Microsoft.EntityFrameworkCore;
using MovieBookLibrary.Api.Data;
using MovieBookLibrary.Api.Models;
using MovieBookLibrary.Api.Repositories;
using MovieBookLibrary.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<LibraryContext>(
    options => options.UseSqlite("Data Source=library.db"));

builder.Services.AddScoped<ILibraryItemRepository, EFCoreLibraryItemRepository>();
builder.Services.AddScoped<ILibraryItemService, LibraryItemService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();

    if (!context.LibraryItems.Any())
    {
        context.LibraryItems.AddRange(
            new LibraryItem
            {
                Title = "Inception",
                Type = "movie",
                Year = 2010,
                Status = "watched",
                Rating = 5,
                Notes = "A Nolan classic."
            },
            new LibraryItem
            {
                Title = "The Pragmatic Programmer",
                Type = "book",
                Year = 1999,
                Status = "reading",
                Rating = 4,
                Notes = "Re-reading chapter on craftsmanship."
            });

        context.SaveChanges();
    }
}

app.Run();
