using Microsoft.EntityFrameworkCore;
using MovieBookLibrary.Api.Models;

namespace MovieBookLibrary.Api.Data;

public class LibraryContext(DbContextOptions<LibraryContext> options) : DbContext(options)
{
    public DbSet<LibraryItem> LibraryItems { get; set; } = null!;
}


