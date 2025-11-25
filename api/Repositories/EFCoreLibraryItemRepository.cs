using Microsoft.EntityFrameworkCore;
using MovieBookLibrary.Api.Data;
using MovieBookLibrary.Api.Models;

namespace MovieBookLibrary.Api.Repositories;

public class EFCoreLibraryItemRepository : ILibraryItemRepository
{
    private readonly LibraryContext _context;

    public EFCoreLibraryItemRepository(LibraryContext context)
    {
        _context = context;
    }

    public async Task<LibraryItem> CreateAsync(LibraryItem item)
    {
        if (item.Id == Guid.Empty)
        {
            item.Id = Guid.NewGuid();
        }

        _context.LibraryItems.Add(item);
        await _context.SaveChangesAsync();

        return item;
    }

    public async Task DeleteAsync(Guid id)
    {
        var existing = await _context.LibraryItems.FirstOrDefaultAsync(i => i.Id == id);
        if (existing is null)
        {
            return;
        }

        _context.LibraryItems.Remove(existing);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<LibraryItem>> GetAllAsync(string? type = null)
    {
        IQueryable<LibraryItem> query = _context.LibraryItems;

        if (!string.IsNullOrWhiteSpace(type))
        {
            query = query.Where(i => i.Type == type);
        }

        return await query.AsNoTracking().ToListAsync();
    }

    public async Task<LibraryItem?> GetByIdAsync(Guid id)
    {
        return await _context.LibraryItems
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task UpdateAsync(LibraryItem item)
    {
        _context.LibraryItems.Update(item);
        await _context.SaveChangesAsync();
    }
}


