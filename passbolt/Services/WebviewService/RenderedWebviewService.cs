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
    }
}
