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


using System.Threading.Tasks;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using passbolt.Controllers;
using passbolt.Models.CredentialLocker;
using passbolt.Services.CredentialLockerService;
using passbolt.Services.NavigationService;

namespace passbolt_windows_tests.UnitTests
{
    public class MockMainController: MainController
    {

        public CoreWebView2NewWindowRequestedEventArgs newWindowRequestedEventArgs;
        public bool hasOpenedDialog = false;
        public CoreWebView2WebResourceResponse webView2WebResourceResponse;
        public string trustedDomain = null;
        public string renderedUrl = null;
        public string backgroundUrl = null;
        public ApplicationConfiguration applicationConfiguration;

        public MockMainController(WebView2 webviewRendered, WebView2 webviewBackground, CredentialLockerService credentialLockerService) : base(webviewRendered, webviewBackground)
        {
            base.credentialLockerService = credentialLockerService;
        }

        public override void NewWindowRequested(CoreWebView2 sender, CoreWebView2NewWindowRequestedEventArgs args)
        {
            // keep the original behavior
            base.NewWindowRequested(sender, args);
            newWindowRequestedEventArgs = args;
        }

        public override void SetWebviewSettings(WebView2 webView)
        {
            base.SetWebviewSettings(webView);
        }

        public override async Task LoadWebviews()
        {
           await base.LoadWebviews();
        }

        public void DomDialogRequested(CoreWebView2 sender, CoreWebView2ScriptDialogOpeningEventArgs args)
        {
            this.hasOpenedDialog = true;
        }

        public override void AllowNavigation(WebView2 sender, CoreWebView2NavigationStartingEventArgs args, AbstractNavigationService navigationService)
        {
            base.AllowNavigation(sender, args, navigationService);
        }

        /// <summary>
        /// WebMessageReceived event handler for the background
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected override void WebResourceRequested(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs resource)
        {
            base.WebResourceRequested(sender, resource);
            trustedDomain = resource.Request.Uri;
            webView2WebResourceResponse = resource.Response;
        }

        /// <summary>
        /// Get the configuration from the credential locker
        /// </summary>
        /// <returns></returns>
        public async Task<ApplicationConfiguration> GetConfiguredApplication() {
            applicationConfiguration = await base.GetApplicationConfiguration();
            renderedUrl = "https://" + applicationConfiguration.renderedUrl;
            backgroundUrl = "https://" + applicationConfiguration.backgroundUrl;
            return applicationConfiguration;
        }

        /// <summary>
        /// Remove the configuration from the credential locker
        /// </summary>
        /// <returns></returns>
        public async Task RemoveConfiguration()
        {
            await base.credentialLockerService.Remove("configuration");
        }
    }
}
