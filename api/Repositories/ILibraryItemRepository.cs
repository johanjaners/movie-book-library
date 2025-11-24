using MovieBookLibrary.Api.Models;

namespace MovieBookLibrary.Api.Repositories;

public interface ILibraryItemRepository
{
    Task<IEnumerable<LibraryItem>> GetAllAsync(string? type = null);
    Task<LibraryItem?> GetByIdAsync(Guid id);
    Task<LibraryItem> CreateAsync(LibraryItem item);
    Task UpdateAsync(LibraryItem item);
    Task DeleteAsync(Guid id);
}
