using System.Collections.Generic;
using System.Linq;
using MovieBookLibrary.Api.Dtos;
using MovieBookLibrary.Api.Models;
using MovieBookLibrary.Api.Repositories;

namespace MovieBookLibrary.Api.Services;

public class LibraryItemService : ILibraryItemService
{
    private static readonly string[] AllowedTypes = ["movie", "book"];

    private readonly ILibraryItemRepository _repository;

    public LibraryItemService(ILibraryItemRepository repository)
    {
        _repository = repository;
    }

    public async Task<LibraryItemDto> CreateAsync(CreateLibraryItemDto dto)
    {
        Validate(dto.Title, dto.Type);

        var entity = new LibraryItem
        {
            Id = Guid.NewGuid(),
            Title = dto.Title.Trim(),
            Type = EnsureValidType(dto.Type),
            Year = dto.Year,
            Status = dto.Status,
            Rating = dto.Rating,
            Notes = dto.Notes
        };

        var created = await _repository.CreateAsync(entity);
        return ToDto(created);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    public async Task<IEnumerable<LibraryItemDto>> GetAllAsync(string? type = null)
    {
        var normalizedType = string.IsNullOrWhiteSpace(type) ? null : EnsureValidType(type!);
        var items = await _repository.GetAllAsync(normalizedType);
        return items.Select(ToDto);
    }

    public async Task<LibraryItemDto?> GetByIdAsync(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        return item is null ? null : ToDto(item);
    }

    public async Task<LibraryItemDto?> UpdateAsync(Guid id, UpdateLibraryItemDto dto)
    {
        Validate(dto.Title, dto.Type);

        var existing = await _repository.GetByIdAsync(id);
        if (existing is null)
        {
            return null;
        }

        existing.Title = dto.Title.Trim();
        existing.Type = EnsureValidType(dto.Type);
        existing.Year = dto.Year;
        existing.Status = dto.Status;
        existing.Rating = dto.Rating;
        existing.Notes = dto.Notes;

        await _repository.UpdateAsync(existing);
        return ToDto(existing);
    }

    private static void Validate(string? title, string? type)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Title is required.", nameof(title));
        }

        EnsureValidType(type);
    }

    private static string NormalizeType(string type) => type.Trim().ToLowerInvariant();

    private static string EnsureValidType(string? type)
    {
        if (string.IsNullOrWhiteSpace(type))
        {
            throw new ArgumentException("Type is required.", nameof(type));
        }

        var normalized = NormalizeType(type!);
        if (!AllowedTypes.Contains(normalized))
        {
            throw new ArgumentException("Type must be 'movie' or 'book'.", nameof(type));
        }

        return normalized;
    }

    private static LibraryItemDto ToDto(LibraryItem item) =>
        new()
        {
            Id = item.Id,
            Title = item.Title,
            Type = item.Type,
            Year = item.Year,
            Status = item.Status,
            Rating = item.Rating,
            Notes = item.Notes
        };
}
