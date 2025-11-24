using System.Collections.Generic;
using System.Linq;
using MovieBookLibrary.Api.Models;

namespace MovieBookLibrary.Api.Repositories;

public class InMemoryLibraryItemRepository : ILibraryItemRepository
{
    private readonly List<LibraryItem> _items =
    [
        new LibraryItem
        {
            Id = Guid.NewGuid(),
            Title = "Inception",
            Type = "movie",
            Year = 2010,
            Status = "watched",
            Rating = 5,
            Notes = "A Nolan classic."
        },
        new LibraryItem
        {
            Id = Guid.NewGuid(),
            Title = "The Pragmatic Programmer",
            Type = "book",
            Year = 1999,
            Status = "reading",
            Rating = 4,
            Notes = "Re-reading chapter on craftsmanship."
        }
    ];

    private readonly object _lock = new();

    public Task<LibraryItem> CreateAsync(LibraryItem item)
    {
        lock (_lock)
        {
            if (item.Id == Guid.Empty)
            {
                item.Id = Guid.NewGuid();
            }

            _items.Add(Clone(item));
            return Task.FromResult(Clone(item));
        }
    }

    public Task DeleteAsync(Guid id)
    {
        lock (_lock)
        {
            var index = _items.FindIndex(i => i.Id == id);
            if (index >= 0)
            {
                _items.RemoveAt(index);
            }
        }

        return Task.CompletedTask;
    }

    public Task<IEnumerable<LibraryItem>> GetAllAsync(string? type = null)
    {
        lock (_lock)
        {
            IEnumerable<LibraryItem> result = _items
                .Select(Clone)
                .AsEnumerable();

            if (!string.IsNullOrWhiteSpace(type))
            {
                result = result.Where(i => i.Type.Equals(type, StringComparison.OrdinalIgnoreCase));
            }

            return Task.FromResult(result);
        }
    }

    public Task<LibraryItem?> GetByIdAsync(Guid id)
    {
        lock (_lock)
        {
            var match = _items.FirstOrDefault(i => i.Id == id);
            return Task.FromResult(match is null ? null : Clone(match));
        }
    }

    public Task UpdateAsync(LibraryItem item)
    {
        lock (_lock)
        {
            var index = _items.FindIndex(i => i.Id == item.Id);
            if (index >= 0)
            {
                _items[index] = Clone(item);
            }
        }

        return Task.CompletedTask;
    }

    private static LibraryItem Clone(LibraryItem item)
    {
        return new LibraryItem
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
}
