using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using Windows.ApplicationModel;
using Windows.Storage;
using Windows.UI.Xaml.Controls;


namespace passbolt
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private string blankPage = "about:blank";
        /// <summary>
        /// Constructor for the main page
        /// </summary>
        public MainPage()
        {
            // Initialize the page
            this.InitializeComponent();
        }

        /// <summary>
        /// This method is called when the rendered web view completes navigation.
        /// </summary>
        private void Rendered_NavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            if (Rendered != null && args.Uri == this.blankPage)
            {
                this.LoadRenderedWebview();
            }
        }

        /// <summary>
        /// This method is called when the background web view completes navigation.
        /// </summary>
        private void Background_NavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            if (Rendered != null && args.Uri == this.blankPage)
            {
                this.LoadBackgroundWebview();
            }
        }

        /// <summary>
        /// This method is called when the background web view completes navigation.
        /// </summary>

        private async void Background_NavigationCompleted(WebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            // Load script to inject for background webview
            StorageFolder backgroundFolder = await this.FindInWebviewFolder("Background");
            StorageFolder distBackgroundFolder = await backgroundFolder.GetFolderAsync("dist");
            StorageFile file = await distBackgroundFolder.GetFileAsync("background.js");
            Stream streamJS = await file.OpenStreamForReadAsync();
            string script = new StreamReader(streamJS).ReadToEnd();
            await Background.ExecuteScriptAsync(script);
            Background.CoreWebView2.OpenDevToolsWindow();
        }

        /// <summary>
        /// This method is called when the rendered web view completes navigation.
        /// </summary>
        private void Rendered_NavigationCompleted(WebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {

        }

        /// <summary>
        /// load the rendered web view
        /// </summary>
        private async void LoadRenderedWebview() {
            await Rendered.EnsureCoreWebView2Async();
            string desktopUrl = "desktop.passbolt.com";

            // Load rendered folder to insert into the virtual host
            StorageFolder renderedFolder = await this.FindInWebviewFolder("Rendered");

            // Set virtual host to folder mapping, restrict host access to the desktopUrl
            Rendered.CoreWebView2.SetVirtualHostNameToFolderMapping(desktopUrl, renderedFolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);

            // Set the source for rendered webview
            Rendered.Source = new Uri(this.BuildHostUri(desktopUrl, "index.html"));
        }

        /// <summary>
        /// load the background web view
        /// </summary>
        private async void LoadBackgroundWebview()
        {
            await Background.EnsureCoreWebView2Async();
            string randomUrl = Guid.NewGuid().ToString();

            // Load rendered folder to insert into the virtual host
            StorageFolder backgroundFolder = await this.FindInWebviewFolder("Background");

            // Set virtual host to folder mapping, restrict host access to the randomUrl
            Background.CoreWebView2.SetVirtualHostNameToFolderMapping(randomUrl, backgroundFolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);

            // Set the source for background webview
            Background.Source = new Uri(this.BuildHostUri(randomUrl, "index.html"));
        }


        /// <summary>
        /// find folder into the webview folder
        /// </summary>
        /// <param name="webviewFolder"></param>
        /// <returns> The Storage folder found </returns>
        private async Task<StorageFolder> FindInWebviewFolder(string webviewFolder)
        {
            StorageFolder installationFolder = Package.Current.InstalledLocation;
            StorageFolder viewsFolder = await installationFolder.GetFolderAsync("Webviews");
            return await viewsFolder.GetFolderAsync(webviewFolder);
        }

        /// <summary>
        /// build a host uri for webviews
        /// </summary>
        /// <param name="host"></param>
        /// <param name="path"></param>
        /// <returns>The uri for the host</returns>
        private string BuildHostUri(string host, string path)
        {
            UriBuilder builder = new UriBuilder();
            builder.Scheme = "http";
            builder.Host = host;
            builder.Path = path;
            return builder.Uri.ToString();
        }

    }
}
