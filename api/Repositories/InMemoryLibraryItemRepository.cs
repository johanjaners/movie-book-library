using MovieBookLibrary.Api.Models;

namespace MovieBookLibrary.Api.Repositories;

public class InMemoryLibraryItemRepository : ILibraryItemRepository
{
    public Task<LibraryItem> CreateAsync(LibraryItem item)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<LibraryItem>> GetAllAsync(string? type = null)
    {
        throw new NotImplementedException();
    }

    public Task<LibraryItem?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(LibraryItem item)
    {
        throw new NotImplementedException();
    }
}
