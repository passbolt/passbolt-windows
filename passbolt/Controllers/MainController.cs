/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
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

using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using passbolt.Exceptions;
using passbolt.Models;
using passbolt.Models.CredentialLocker;
using passbolt.Models.Messaging;
using passbolt.Models.Messaging.Topics;
using passbolt.Services.CredentialLocker;
using passbolt.Services.HttpService;
using passbolt.Services.LocalFolder;
using passbolt.Services.Mfa;
using passbolt.Services.NavigationService;
using passbolt.Services.WebviewService;
using passbolt.Utils;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace passbolt.Controllers
{
    public class MainController
    {
        private WebView2 webviewRendered;
        private WebView2 webviewBackground;
        private AccountMetaData currentAccountMetaData;
        private Regex validateUUIDRegex = new Regex("^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$");
        private string blankPage = "about:blank";
        protected LocalFolderService localFolderService = LocalFolderService.Instance;
        protected CredentialLockerService credentialLockerService;
        protected RenderedTopic renderedTopic;
        protected BackgroundTopic backgroundTopic;
        protected RenderedNavigationService renderedNavigationService;
        protected BackgroundNavigationService backgroundNavigationService;
        protected HttpService httpService = new HttpService();
        protected RenderedWebviewService renderedWebviewService;
        protected BackgroundWebviewService backgroundWebviewService;

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
            credentialLockerService = new CredentialLockerService();
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
                currentAccountMetaData = await this.credentialLockerService.GetAccountMetadata();

                if (currentAccountMetaData != null)
                {
                    //When the  application start the main controller save the metadata and init the httpservice trusted domain
                    this.httpService.setTrustedDomain(currentAccountMetaData.domain);
                    //If the credential locker is not empty we launch the authentication applications.
                    await LocalFolderService.Instance.CreateRenderedIndex("index-auth.html", "rendered-auth", "ext_authentication.min.css", currentAccountMetaData.domain);
                    await LocalFolderService.Instance.CreateBackgroundIndex("index-auth.html", "background-auth", currentAccountMetaData.domain);
                }
                else
                {
                    //If the credential locker is  empty we launch the importation applications.
                    await LocalFolderService.Instance.CreateRenderedIndex("index-import.html", "rendered-import", "ext_authentication.min.css");
                    await LocalFolderService.Instance.CreateBackgroundIndex("index-import.html", "background-import");
                }

                await this.LoadWebviews();
                this.SetWebviewSettings(webviewBackground);
            }
            //When credentials are saved from import and we navigate to auth application we init the trusted domain to check API calls
            if (currentAccountMetaData == null && this.backgroundNavigationService.IsAuthApplication(args.Uri))
            {
                currentAccountMetaData = await this.credentialLockerService.GetAccountMetadata();
                this.httpService.setTrustedDomain(currentAccountMetaData.domain);
            }
            //In case of we are facing to an authentication error during import we delete trusted domain from the HTTPServices
            if (currentAccountMetaData != null && this.backgroundNavigationService.IsImportApplication(args.Uri))
            {
                currentAccountMetaData = null;
                this.httpService.unSetTrustedDomain();
            }
        }

        /// <summary>
        /// Navigation starting event handler for the rendered webview
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public async Task RenderedNavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            if (webviewRendered == null) { return; }

            //This is the navigation guard of our webviews
            this.AllowNavigation(sender, args, this.renderedNavigationService);

            //Webviews are loaded in the background, the default url is about:blank. In case this url is loaded, we load the webviews with the correct urls.
            if (args.Uri == this.blankPage)
            {
                this.SetWebviewSettings(webviewRendered);
            }

            //Check if the Mfa is completed 
            if (MfaService.Instance.IsMfaUrls(args.Uri) && MfaService.Instance.HasMfaCompleted(args.Uri))
            {
                //Reinit context to remove mfa urls allowed
                renderedNavigationService.DisallowMfaUrls();
                // We cancel the redirection 
                args.Cancel = true;
                // Redirect to workspace
                await backgroundTopic.RedirectToWorkspace();
            }
        }
        /// <summary>
        /// load the background web view
        /// </summary>
        public virtual async Task LoadWebviews()
        {
            await webviewRendered.EnsureCoreWebView2Async();
            await webviewBackground.EnsureCoreWebView2Async();

            this.renderedWebviewService = new RenderedWebviewService(this.webviewRendered.CoreWebView2);
            this.backgroundWebviewService = new BackgroundWebviewService(this.webviewBackground.CoreWebView2);
            this.backgroundNavigationService = BackgroundNavigationService.Instance;
            this.renderedNavigationService = RenderedNavigationService.Instance;

            this.backgroundTopic = new BackgroundTopic(webviewBackground, webviewRendered, localFolderService, backgroundWebviewService);

            var backgroundUrl = await this.backgroundWebviewService.SetVirtualHost();
            var renderedUrl = await this.renderedWebviewService.SetVirtualHost();

            var indexPage = currentAccountMetaData != null
                ? "index-auth.html"
                : "index-import.html";

            webviewBackground.Source = new Uri(UriBuilderHelper.BuildHostUri(backgroundUrl, indexPage));
            webviewRendered.Source = new Uri(UriBuilderHelper.BuildHostUri(renderedUrl, indexPage));

            // Init filter to catch all http request from background 
            webviewBackground.CoreWebView2.AddWebResourceRequestedFilter("*", CoreWebView2WebResourceContext.All);

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
            if (sender.Source == webviewRendered.Source.AbsoluteUri)
            {
                this.renderedNavigationService.CanOpenBrowser(args.Uri);
            }
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
                //When session is expired we are redirected to the API
                //To avoid this we catch the navigation and replicate the behaviour done during logout
                if (args.Uri.EndsWith("/auth/login"))
                {
                    backgroundTopic.ProceedMessage(new IPC(AuthenticationTopics.LOG_OUT));
                }
                args.Cancel = true;
            }
        }

        /// <summary>
        /// WebMessageReceived event handler for the background
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected virtual void WebResourceRequested(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs resource)
        {
            httpService.CheckAPICall(sender, resource);
            if (resource.ResourceContext == CoreWebView2WebResourceContext.XmlHttpRequest)
            {
                //Check if the request is allowed with the trusted domain
                // API does not support OPTIONS method, we need to intercept it and return the correct headers
                if (resource.Request.Method == HttpMethod.Options.Method)
                {
                    httpService.ResolveOptionMethod(sender, resource);
                }
                else if (httpService.isCallToPownedService(resource))
                {
                    resource.GetDeferral().Complete();
                }
                else
                {
                    HttpRequestMessage request = httpService.BuildHttpRequest(resource);
                    try
                    {
                        HttpResponseMessage response = httpService.SendRequest(request).Result;
                        httpService.SendResponseToWebview(sender, resource, response);
                    }
                    catch (AggregateException ex)
                    {
                        foreach (var innerException in ex.InnerExceptions)
                        {
                            // Handle each inner exception based on its type
                            if (innerException is HttpRequestException httpRequestException)
                            {
                                httpService.SendErrorToWebview(sender, resource, request, httpRequestException.InnerException.Message);
                            }
                        }
                    }

                }
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

            //Validate requestId to be an uuid
            if (ipc.requestId != null && !this.validateUUIDRegex.IsMatch(ipc.requestId))
            {
                throw new UnauthorizedTopicException(ipc.topic);
            }

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

                if (backgroundNavigationService?.IsAuthApplication(sender.CoreWebView2.Source) == true
                    || backgroundNavigationService?.IsWorkspaceFromImportationApplication(sender.CoreWebView2.Source) == true)
                {
                    var accountMetaData = await this.credentialLockerService.GetAccountMetadata();
                    var accountSecret = await this.credentialLockerService.GetAccountSecret();

                    Messaging.Send(webviewBackground, "passbolt.account.set-current", new AccountKit(accountMetaData, accountSecret));
                }
                if (this.backgroundTopic == null && this.backgroundWebviewService != null)
                {
                    this.backgroundTopic = new BackgroundTopic(webviewBackground, webviewRendered, localFolderService, backgroundWebviewService);
                }
                //Webview can be not initialized at this step so we wait it
                if (backgroundNavigationService != null)
                {
                    backgroundNavigationService.SetPreviousNavigation(sender.CoreWebView2.Source);
                }
                this.renderedTopic = new RenderedTopic(webviewBackground, webviewRendered, localFolderService, renderedWebviewService);
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
