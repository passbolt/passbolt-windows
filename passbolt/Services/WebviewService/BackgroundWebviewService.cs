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

using System;
using System.Threading.Tasks;
using Microsoft.Web.WebView2.Core;
using passbolt.Models.LocalStorage;
using passbolt.Utils;

namespace passbolt.Services.WebviewService
{
    public class BackgroundWebviewService
    {
        private CoreWebView2 backgroundWebview;
        public BackgroundWebviewService(CoreWebView2 background)
        {
            this.backgroundWebview = background;
        }

        /// <summary>
        /// Check if trusted domain is set or retrieve it from the background webview
        /// </summary>
        /// <param name="sender"></param>
        public async Task<string> GetTrustedDomain()
        {
            string localItem = await this.backgroundWebview.ExecuteScriptAsync("JSON.parse(localStorage.getItem('_passbolt_data'))");
            if (!string.IsNullOrEmpty(localItem))
            {
                var passboltData = SerializationHelper.DeserializeFromJson<PassboltData>(localItem);
                return passboltData.Config.TrustedDomain;
            }
            return null;
        }
    }
}
