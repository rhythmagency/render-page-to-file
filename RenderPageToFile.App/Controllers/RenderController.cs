namespace RenderPageToFile.App.Controllers
{

    // Namespaces.
    using System;
    using System.IO;
    using System.Web.Hosting;
    using System.Web.Http;
    using Types;
    using Umbraco.Core.Logging;
    using Umbraco.Web.Editors;
    using Umbraco.Web.Mvc;


    /// <summary>
    /// Controller to handle requests to store Umbraco pages as files on the server.
    /// </summary>
    [PluginController("RenderPageToFile")]
    public class RenderController : UmbracoAuthorizedJsonController
    {

        #region Constants

        private const string StoreError = "Error attempting to store page to a file.";
        private const string StoreFailed = "Failed to store page to a file.";
        private const string InvalidRequest = "Request to render page was invalid.";
        private const string RenderError = "An error occurred while attempting to render the page.";

        #endregion


        #region Action Methods

        /// <summary>
        /// Renders the specified page to the specified file.
        /// </summary>
        /// <param name="request">The render request details.</param>
        /// <returns>
        /// An object indicating success or failure.
        /// </returns>
        [HttpPost]
        public object RenderPage(RenderRequest request)
        {

            // Variables.
            var pageId = request.PageId;
            var path = request.FilePath;
            var hadError = false;
            var failureReason = default(string);


            // Attempt to store the page as a file.
            try
            {
                var valid = !string.IsNullOrWhiteSpace(path) && Umbraco.TypedContent(pageId) != null;
                if (valid)
                {
                    var pageHtml = this.Umbraco.RenderTemplate(pageId).ToString();
                    var filePath = HostingEnvironment.MapPath(path);
                    File.WriteAllText(filePath, pageHtml);
                    return new
                    {
                        Success = true
                    };
                }
                else
                {
                    failureReason = InvalidRequest;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error(this.GetType(), StoreError, ex);
                hadError = true;
                failureReason = RenderError;
            }


            // Log error and return failure result.
            if (!hadError)
            {
                LogHelper.Warn(this.GetType(), StoreFailed);
            }
            return new
            {
                Success = false,
                FailureReason = failureReason
            };

        }

        #endregion

    }

}