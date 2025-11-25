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

// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();
    context.Database.Migrate();

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
                Notes = "A Nolan classic.",
                CoverImageUrl = "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "The Pragmatic Programmer",
                Type = "book",
                Year = 1999,
                Status = "reading",
                Rating = 4,
                Notes = "Re-reading chapter on craftsmanship.",
                CoverImageUrl = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "Arrival",
                Type = "movie",
                Year = 2016,
                Status = "unwatched",
                Rating = 0,
                Notes = "Next up on the sci-fi list.",
                CoverImageUrl = "https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "Clean Code",
                Type = "book",
                Year = 2008,
                Status = "finished",
                Rating = 5,
                Notes = "Great ref for refactoring sessions.",
                CoverImageUrl = "https://images.unsplash.com/photo-1528209392022-3683c7c089e0?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "Interstellar",
                Type = "movie",
                Year = 2014,
                Status = "watching",
                Rating = 4,
                CoverImageUrl = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "Atomic Habits",
                Type = "book",
                Year = 2018,
                Status = "unread",
                Rating = 0,
                Notes = "Recommended by team retro.",
                CoverImageUrl = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "Blade Runner 2049",
                Type = "movie",
                Year = 2017,
                Status = "watched",
                Rating = 5,
                CoverImageUrl = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=480&q=80"
            },
            new LibraryItem
            {
                Title = "Deep Work",
                Type = "book",
                Year = 2016,
                Status = "reading",
                Rating = 3,
                CoverImageUrl = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=480&q=80"
            }
        };

        context.LibraryItems.AddRange(seedItems);
        context.SaveChanges();
    }
}

app.Run();
