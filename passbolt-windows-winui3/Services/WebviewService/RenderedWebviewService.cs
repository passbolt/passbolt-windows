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
* @since         0.0.2
*/

using System.Threading.Tasks;
using Microsoft.Web.WebView2.Core;
using passbolt_windows_winui3.Services.NavigationService;
using Windows.Storage;

namespace passbolt_windows_winui3.Services.WebviewService
{
    public class RenderedWebviewService : WebviewService
    {
        private RenderedNavigationService renderedNavigationService;

        public RenderedWebviewService(CoreWebView2 rendered) : base(rendered)
        {
            this.renderedNavigationService = RenderedNavigationService.Instance;
        }

        /// <summary>
        /// Set the virtual host for the rendered webview
        /// </summary>
        /// <returns></returns>
        public async override Task<string> SetVirtualHost()
        {
            this.RemoveVirtualHost();
            var applicationConfiguration = await this.GetApplicationConfiguration();
            string renderedUrl = applicationConfiguration.renderedUrl + "/Rendered";

            this.renderedNavigationService.Initialize(applicationConfiguration.renderedUrl);
            StorageFolder distfolder = this.localFolderService.GetWebviewsFolder();
            var installedDistFolder = this.localFolderService.GetWebviewsFolderInstallation();

            // Set virtual host for each dist
            webview.SetVirtualHostNameToFolderMapping("rendered.dist", installedDistFolder.Path, CoreWebView2HostResourceAccessKind.Allow);
            currentHost = applicationConfiguration.renderedUrl;
            // Set virtual host to folder mapping, restrict host access to the randomUrl
            webview.SetVirtualHostNameToFolderMapping(applicationConfiguration.renderedUrl, distfolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);

            return renderedUrl;
        }
    }
}
