using Microsoft.AspNetCore.Mvc;
using MovieBookLibrary.Api.Dtos;
using MovieBookLibrary.Api.Services;

namespace MovieBookLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibraryItemsController : ControllerBase
{
    private readonly ILibraryItemService _service;

    public LibraryItemsController(ILibraryItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LibraryItemDto>>> GetAll([FromQuery] string? type)
    {
        var items = await _service.GetAllAsync(type);
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LibraryItemDto>> GetById(Guid id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<LibraryItemDto>> Create(CreateLibraryItemDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<LibraryItemDto>> Update(Guid id, UpdateLibraryItemDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        if (updated is null)
        {
            return NotFound();
        }

        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
