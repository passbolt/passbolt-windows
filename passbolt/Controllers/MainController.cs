/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.0.1
 */

using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using passbolt.Services.NavigationService;
using passbolt.Utils;
using Windows.ApplicationModel;
using Windows.Storage;

namespace passbolt.Controllers
{
    public class MainController
    {
        private WebView2 webviewRendered;
        private WebView2 webviewBackground;
        protected StorageFolder backgroundFolder;
        protected StorageFolder renderedFolder;

        public MainController(
            WebView2 webviewRendered, WebView2 webviewBackground) {
            this.webviewBackground = webviewBackground;
            this.webviewRendered = webviewRendered;
        }

        /// <summary>
        /// load the rendered web view
        /// </summary>
        public virtual async Task LoadRenderedWebview()
        {
            await webviewRendered.EnsureCoreWebView2Async();
            string desktopUrl = "desktop.passbolt.com";

            // Load rendered folder to insert into the virtual host
            if (renderedFolder == null)
                renderedFolder = await this.FindInWebviewFolder("Rendered");

            // Set virtual host to folder mapping, restrict host access to the desktopUrl
            webviewRendered.CoreWebView2.SetVirtualHostNameToFolderMapping(desktopUrl, renderedFolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);
            // Set the source for rendered webview
            webviewRendered.Source = new Uri(UriBuiler.BuildHostUri(desktopUrl, "index.html"));
        }

        /// <summary>
        /// load the background web view
        /// </summary>
        public virtual async Task LoadBackgroundWebview()
        {
            await webviewBackground.EnsureCoreWebView2Async();
            string randomUrl = Guid.NewGuid().ToString();

            // Load background folder to insert into the virtual host
            if (backgroundFolder == null)
                backgroundFolder = await this.FindInWebviewFolder("Background");

            // Set virtual host to folder mapping, restrict host access to the randomUrl
            webviewBackground.CoreWebView2.SetVirtualHostNameToFolderMapping(randomUrl, backgroundFolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);

            // Set the source for background webview
            webviewBackground.Source = new Uri(UriBuiler.BuildHostUri(randomUrl, "index.html"));
        }

        /// <summary>
        /// Set the webview settings including minimal security requirements
        /// </summary>
        /// <param name="webView"></param>
        public virtual void SetWebviewSettings(WebView2 webView)
        {
            // Remove devtools from settings
            webView.CoreWebView2.Settings.AreDevToolsEnabled = false;
            // Remove swipe navigation
            webView.CoreWebView2.Settings.IsSwipeNavigationEnabled = false;
            // Remove autosaved password
            webView.CoreWebView2.Settings.IsPasswordAutosaveEnabled = false;
            // New host cannot be added
            webView.CoreWebView2.Settings.AreHostObjectsAllowed = false;
            // Dialog will not be allowed
            webView.CoreWebView2.Settings.AreDefaultScriptDialogsEnabled = false;
            // Remove contextual menu
            webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
            // Remove accelerator keys like f12
            webView.CoreWebView2.Settings.AreBrowserAcceleratorKeysEnabled = false;
            // Attach new events
            webView.CoreWebView2.NewWindowRequested += NewWindowRequested;
        }

        /// <summary>
        /// This method is called when webviews request a new windows to be opened.
        /// </summary>
        public virtual void NewWindowRequested(CoreWebView2 sender, CoreWebView2NewWindowRequestedEventArgs args)
        {
            args.Handled = true;
        }

        /// <summary>
        /// Initialised the background page and inject script
        /// </summary>
        /// <returns></returns>
        public virtual async Task BackgroundInitialisation()
        {
            // Load script to inject for background webview
            StorageFolder backgroundFolder = await this.FindInWebviewFolder("Background");
            StorageFolder distBackgroundFolder = await backgroundFolder.GetFolderAsync("dist");
            StorageFile file = await distBackgroundFolder.GetFileAsync("background.js");
            Stream streamJS = await file.OpenStreamForReadAsync();
            string script = new StreamReader(streamJS).ReadToEnd();
            await webviewBackground.ExecuteScriptAsync(script);
        }

        /// <summary>
        /// Check Navigation for webviews2
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public virtual void AllowNavigation(WebView2 sender, CoreWebView2NavigationStartingEventArgs args, AbstractNavigationService navigationService)
        {
            if (!navigationService.canNavigate(args.Uri))
            {
                args.Cancel = true;
            }
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
    }
}
