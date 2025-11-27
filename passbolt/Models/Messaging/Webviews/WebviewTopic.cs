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

using Microsoft.UI.Xaml.Controls;
using passbolt.Services.LocalFolder;
using passbolt.Services.WebviewService;

namespace passbolt.Models.Messaging
{
    public abstract class WebviewTopic
    {
        protected WebView2 background { get; set; }
        protected WebView2 rendered { get; set; }
        protected LocalFolderService localFolderService { get; set; }

        protected WebviewService webviewService { get; set; }
        public WebviewTopic()
        {
            background = null;
            rendered = null;
            localFolderService = null;
            webviewService = null;
        }
        public WebviewTopic(WebView2 background, WebView2 rendered, LocalFolderService localFolderService, WebviewService webviewService)
        {
            this.background = background;
            this.rendered = rendered;
            this.localFolderService = localFolderService;
            this.webviewService = webviewService;
        }

        /// <summary>
        /// Process ipc message receive
        /// </summary>
        /// <param name="ipc"></param>
        public abstract void ProceedMessage(IPC ipc);
    }
}
