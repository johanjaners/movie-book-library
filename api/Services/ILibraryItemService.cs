using MovieBookLibrary.Api.Dtos;

namespace MovieBookLibrary.Api.Services;

public interface ILibraryItemService
{
    Task<IEnumerable<LibraryItemDto>> GetAllAsync(string? type = null);
    Task<LibraryItemDto?> GetByIdAsync(Guid id);
    Task<LibraryItemDto> CreateAsync(CreateLibraryItemDto dto);
    Task<LibraryItemDto?> UpdateAsync(Guid id, UpdateLibraryItemDto dto);
    Task<bool> DeleteAsync(Guid id);
}
