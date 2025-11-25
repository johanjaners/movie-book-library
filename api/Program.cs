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
        var seedItems = new[]
        {
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
            },
            new LibraryItem
            {
                Title = "Arrival",
                Type = "movie",
                Year = 2016,
                Status = "unwatched",
                Rating = 0,
                Notes = "Next up on the sci-fi list."
            },
            new LibraryItem
            {
                Title = "Clean Code",
                Type = "book",
                Year = 2008,
                Status = "finished",
                Rating = 5,
                Notes = "Great ref for refactoring sessions."
            },
            new LibraryItem
            {
                Title = "Interstellar",
                Type = "movie",
                Year = 2014,
                Status = "watching",
                Rating = 4
            },
            new LibraryItem
            {
                Title = "Atomic Habits",
                Type = "book",
                Year = 2018,
                Status = "unread",
                Rating = 0,
                Notes = "Recommended by team retro."
            },
            new LibraryItem
            {
                Title = "Blade Runner 2049",
                Type = "movie",
                Year = 2017,
                Status = "watched",
                Rating = 5
            },
            new LibraryItem
            {
                Title = "Deep Work",
                Type = "book",
                Year = 2016,
                Status = "reading",
                Rating = 3
            }
        };

        context.LibraryItems.AddRange(seedItems);
        context.SaveChanges();
    }
}

app.Run();
