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
* @since         0.4.0
 */


using Microsoft.Web.WebView2.Core;
using passbolt_windows_winui3.Models.CredentialLocker;
using passbolt_windows_winui3.Services.CredentialLocker;
using passbolt_windows_winui3.Services.LocalFolder;
using passbolt_windows_winui3.Utils;
using System;
using System.Threading.Tasks;

namespace passbolt_windows_winui3.Services.WebviewService
{
    public abstract class WebviewService
    {
        protected CoreWebView2 webview;
        protected LocalFolderService localFolderService;
        protected string currentHost;
        protected CredentialLockerService credentialLockerService;

        protected WebviewService(CoreWebView2 webview)
        {
            this.webview = webview;
            this.localFolderService = LocalFolderService.Instance;
            credentialLockerService = new CredentialLockerService();
        }

        public abstract Task<string> SetVirtualHost();

        /// <summary>
        /// Remove an existing virtual host
        /// </summary>
        protected void RemoveVirtualHost()
        {
            if (this.currentHost != null)
            {
                webview.ClearVirtualHostNameToFolderMapping(this.currentHost);
            }
        }

        /// <summary>
        /// Return the application configuration for webviews
        /// </summary>
        /// <returns></returns>
        protected virtual async Task<ApplicationConfiguration> GetApplicationConfiguration()
        {
            ApplicationConfiguration applicationConfiguration;
            AccountMetaData accountMetaData;

            applicationConfiguration = await credentialLockerService.GetApplicationConfiguration();
            accountMetaData = await credentialLockerService.GetAccountMetadata();
            if (applicationConfiguration == null)
            {
                if (accountMetaData == null)
                {
                    applicationConfiguration = new ApplicationConfiguration()
                    {
                        renderedUrl = GenerateWebviewUrl(),
                        backgroundUrl = GenerateWebviewUrl()
                    };
                }
                else
                {
                    var domain = UriBuilderHelper.GetDomainForUri(accountMetaData.domain);
                    applicationConfiguration = new ApplicationConfiguration()
                    {
                        renderedUrl = GenerateWebviewUrl(domain),
                        backgroundUrl = GenerateWebviewUrl(domain)
                    };
                    await credentialLockerService.Create("configuration", SerializationHelper.SerializeToJson(applicationConfiguration));
                }
            }

            return applicationConfiguration;
        }

        /// <summary>
        /// Geneate the webview url
        /// </summary>
        /// <param name="domain"></param>
        /// <returns></returns>
        private string GenerateWebviewUrl(string domain = "passbolt.local")
        {
            return $"{Guid.NewGuid().ToString()}.{domain}";
        }
    }
}
