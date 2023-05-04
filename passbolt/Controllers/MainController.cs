/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.0.1
 */

using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using passbolt.Models;
using passbolt.Models.Messaging;
using passbolt.Services.NavigationService;
using passbolt.Utils;
using Windows.ApplicationModel;
using Windows.Storage;
using Windows.UI.Xaml.Controls;

namespace passbolt.Controllers
{
    public class MainController
    {
        private WebView2 webviewRendered;
        private WebView2 webviewBackground;
        private string blankPage = "about:blank";
        protected StorageFolder distfolder;
        protected RenderedTopic renderedTopic;
        protected BackgroundTopic backgroundTopic;
        protected RenderedNavigationService renderedNavigationService;
        protected BackgroundNavigationService backgroundNavigationService;

        /// <summary>
        /// controller
        /// </summary>
        /// <param name="webviewRendered"></param>
        /// <param name="webviewBackground"></param>
        public MainController(
            WebView2 webviewRendered, WebView2 webviewBackground)
        {
            this.webviewBackground = webviewBackground;
            this.webviewRendered = webviewRendered;
        }


        /// <summary>
        /// Navigation starting event handler for the background webview
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public async Task BackgroundNavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            if (webviewBackground == null) { return; }

            //This is the navigation guard of our webviews
            this.AllowNavigation(sender, args, this.backgroundNavigationService);

            //Webviews are loaded in the background, the default url is about:blank. In case this url is loaded, we load the webviews with the correct urls.
            if (args.Uri == this.blankPage)
            {
                await this.LoadWebviews();
                this.SetWebviewSettings(webviewBackground);
            }
        }

        /// <summary>
        /// Navigation starting event handler for the rendered webview
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public void RenderedNavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            if (webviewRendered == null) { return; }

            //This is the navigation guard of our webviews
            this.AllowNavigation(sender, args, this.renderedNavigationService);

            //Webviews are loaded in the background, the default url is about:blank. In case this url is loaded, we load the webviews with the correct urls.
            if (args.Uri == this.blankPage)
            {
                this.SetWebviewSettings(webviewRendered);
            }
        }
        /// <summary>
        /// load the background web view
        /// </summary>
        public virtual async Task LoadWebviews()
        {
            await webviewRendered.EnsureCoreWebView2Async();
            await webviewBackground.EnsureCoreWebView2Async();

            // Init filter to catch all http request from background 
            webviewBackground.CoreWebView2.AddWebResourceRequestedFilter("*", CoreWebView2WebResourceContext.XmlHttpRequest);

            string randomUrl = "www.desktop.passbolt.local";
            string backgroundUrl = randomUrl + "/Background";
            string renderedUrl = randomUrl + "/Rendered";

            this.backgroundNavigationService = new BackgroundNavigationService(backgroundUrl);
            this.renderedNavigationService = RenderedNavigationService.Instance;

            this.renderedNavigationService.Initialize(randomUrl);
            StorageFolder installationFolder = Package.Current.InstalledLocation;

            // Load dist folder to insert into the virtual host to avoid exception during testing
            if (distfolder == null)
                distfolder = await installationFolder.GetFolderAsync("Webviews");

            // Set virtual host to folder mapping, restrict host access to the randomUrl
            webviewBackground.CoreWebView2.SetVirtualHostNameToFolderMapping(randomUrl, distfolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);
            webviewRendered.CoreWebView2.SetVirtualHostNameToFolderMapping(randomUrl, distfolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);

            // Set the source for background webview
            webviewBackground.Source = new Uri(UriBuilderHelper.BuildHostUri(backgroundUrl, "index.html"));

            // Subscribes to the WebResourceRequested event of the background window
            webviewBackground.CoreWebView2.WebResourceRequested += WebResourceRequested;
            // Subscribes to the WebMessageReceived event of the rendered and background window
            webviewBackground.CoreWebView2.WebMessageReceived += WebMessageReceived;
            webviewRendered.CoreWebView2.WebMessageReceived += WebMessageReceived;
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
        /// Check Navigation for webviews2
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public virtual void AllowNavigation(WebView2 sender, CoreWebView2NavigationStartingEventArgs args, AbstractNavigationService navigationService)
        {
            if (navigationService != null && !navigationService.canNavigate(args.Uri))
            {
                args.Cancel = true;
            }
        }

        /// <summary>
        /// WebMessageReceived event handler for the background
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void WebResourceRequested(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs e)
        {
            string backendUri = UriBuilderHelper.GetHostAndShemeForUri(e.Request.Uri);

            // We change orign and referer to avoid CORS issues
            e.Request.Headers.SetHeader("Accept", "application/json");
            e.Request.Headers.SetHeader("Origin", backendUri);
            e.Request.Headers.SetHeader("Referer", backendUri);

            //TO DO: create a custom client to handle the request and avoid client to send it directly

            // API does not support OPTIONS method, we need to intercept it and return the correct headers
            if (e.Request.Method == HttpMethod.Options.Method)
            {
                //Get the webview host and scheme
                string desktopWebview = UriBuilderHelper.GetHostAndShemeForUri(sender.Source);

                // Create the headers for the options response
                string[] optionsHeaders = {
                    $"Access-Control-Allow-Origin: {desktopWebview}",
                    "Access-Control-Allow-Credentials: true",
                    "Access-Control-Allow-Headers: content-type, x-csrf-token",
                    "Access-Control-Allow-Methods: DELETE, POST, GET, OPTIONS, PUT"
                };
                // Create Webview2 response with the correct headers to the webviews
                CoreWebView2WebResourceResponse webView2WebResourceResponse = webviewBackground.CoreWebView2.Environment.CreateWebResourceResponse(
                    null,
                    (int)HttpStatusCode.OK,
                    HttpStatusCode.OK.ToString(),
                    string.Join("\n", optionsHeaders));
                e.Response = webView2WebResourceResponse;
            }
        }

        /// <summary>
        /// Listener for webviews message received
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void WebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            string message = e.TryGetWebMessageAsString();
            CoreWebView2 webviewSender = this.GetCoreWebView2Sender(sender);

            if (webviewSender == null || message == null) return;
            IPC ipc = SerializationHelper.DeserializeFromJson<IPC>(message);

            //Checks if we have data before going futher
            if (string.IsNullOrEmpty(ipc.topic) || !AllowedTopics.IsTopicNameAllowed(ipc.topic))
            {
                return;
            }

            // We identify the sender to proceed message by his source
            if (backgroundNavigationService.canNavigate(webviewSender.Source))
            {
                backgroundTopic.ProceedMessage(ipc);
            }
            else if (renderedNavigationService.canNavigate(webviewSender.Source))
            {
                renderedTopic.ProceedMessage(ipc);
            }
        }


        /// <summary>
        /// When background webview has finished his navigation
        /// </summary>
        /// <param name="sender"></param>
        /// <returns></returns>
        public async Task BackgroundNavigationCompleted(WebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Debug.WriteLine("NavigationCompleted: " + sender.CoreWebView2.Source);
            if (args.IsSuccess)
            {
                await webviewBackground.EnsureCoreWebView2Async();
                await webviewRendered.EnsureCoreWebView2Async();

                this.renderedTopic = new RenderedTopic(webviewBackground, webviewRendered);
                this.backgroundTopic = new BackgroundTopic(webviewBackground, webviewRendered);
            }
        }

        /// <summary>
        /// When rendered webview has finished his navigation
        /// </summary>
        /// <param name="sender"></param>
        /// <returns></returns>
        public void RenderedNavigationCompleted(WebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Debug.WriteLine("NavigationCompleted: " + sender.CoreWebView2.Source);
        }
        /// <summary>
        /// Retrieve the Corewebview from the sender
        /// </summary>
        /// <param name="sender"></param>
        /// <returns></returns>
        private CoreWebView2 GetCoreWebView2Sender(object sender)
        {
            CoreWebView2 webviewSender = null;
            try
            {
                if (sender is CoreWebView2)
                {
                    webviewSender = (CoreWebView2)sender;
                }
                else
                {
                    webviewSender = ((WebView2)sender).CoreWebView2;
                }
            }
            catch (InvalidCastException ex)
            {
                Console.WriteLine(ex.Message);
            }

            return webviewSender;
        }
    }
}
