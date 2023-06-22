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
using Microsoft.Web.WebView2.Core;

namespace passbolt.Services.WebviewService
{
    public class RenderedWebviewService
    {
        private CoreWebView2 renderedWebview;
        public RenderedWebviewService(CoreWebView2 rendered)
        {
            this.renderedWebview = rendered;
        }

        /// <summary>
        /// init the rendered webview CSP after initialisation
        /// </summary>
        public async void initRenderedCSP(string trustedDomain, string renderedUrl)
        {
            var csp = "var metaCSP = document.querySelector('meta[http-equiv=\"Content-Security-Policy\"]');\r\n" +
                "metaCSP = document.createElement('meta');\r\n" +
                "metaCSP.setAttribute('http-equiv', 'Content-Security-Policy');\r\n" +
                "document.head.appendChild(metaCSP);\r\n " +
                $"metaCSP.setAttribute('content', `default-src 'self'; script-src 'self'; img-src 'self' {trustedDomain} {renderedUrl};`);";
            await renderedWebview.ExecuteScriptAsync($"{csp}");
        }
    }
}
