namespace MovieBookLibrary.Api.Dtos;

public class UpdateLibraryItemDto
{
    public string Title { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int? Year { get; set; }
    public string? Status { get; set; }
    public int? Rating { get; set; }
    public string? Notes { get; set; }
    public string? CoverImageUrl { get; set; }
}
