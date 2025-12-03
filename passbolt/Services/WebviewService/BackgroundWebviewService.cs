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
* @since         0.4.0
*/

using Microsoft.Web.WebView2.Core;
using passbolt.Services.NavigationService;
using System.Threading.Tasks;
using Windows.Storage;

namespace passbolt.Services.WebviewService
{
    public class BackgroundWebviewService: WebviewService
    {
        private BackgroundNavigationService backgroundNavigationService;

        public BackgroundWebviewService(CoreWebView2 background): base(background)
        {
            this.backgroundNavigationService = BackgroundNavigationService.Instance;
        }

        /// <summary>
        /// Set the virtual host for the background webview
        /// </summary>
        /// <returns></returns>
        public async override Task<string> SetVirtualHost()
        {
            this.RemoveVirtualHost();
            var applicationConfiguration = await this.GetApplicationConfiguration();
            string backgroundUrl = applicationConfiguration.backgroundUrl + "/Background";

            this.backgroundNavigationService.Initialize(applicationConfiguration.backgroundUrl);
            StorageFolder distfolder = this.localFolderService.GetWebviewsFolder();
            var installedDistFolder = this.localFolderService.GetWebviewsFolderInstallation();

            // Set virtual host for each dist
            webview.SetVirtualHostNameToFolderMapping("background.dist", installedDistFolder.Path, CoreWebView2HostResourceAccessKind.Allow);
            currentHost = applicationConfiguration.backgroundUrl;
            // Set virtual host to folder mapping, restrict host access to the randomUrl
            webview.SetVirtualHostNameToFolderMapping(applicationConfiguration.backgroundUrl, distfolder.Path, CoreWebView2HostResourceAccessKind.DenyCors);

            return backgroundUrl;
        }
    }
}
