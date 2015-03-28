namespace RenderPageToFile.App.Types
{

    /// <summary>
    /// A request to render a page to a file.
    /// </summary>
    public class RenderRequest
    {
        public string FilePath { get; set; }
        public int PageId { get; set; }
    }

}