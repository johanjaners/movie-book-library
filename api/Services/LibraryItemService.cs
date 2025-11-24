using MovieBookLibrary.Api.Dtos;
using MovieBookLibrary.Api.Repositories;

namespace MovieBookLibrary.Api.Services;

public class LibraryItemService : ILibraryItemService
{
    private readonly ILibraryItemRepository _repository;

    public LibraryItemService(ILibraryItemRepository repository)
    {
        _repository = repository;
    }

    public Task<LibraryItemDto> CreateAsync(CreateLibraryItemDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<LibraryItemDto>> GetAllAsync(string? type = null)
    {
        throw new NotImplementedException();
    }

    public Task<LibraryItemDto?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<LibraryItemDto?> UpdateAsync(Guid id, UpdateLibraryItemDto dto)
    {
        throw new NotImplementedException();
    }
}
