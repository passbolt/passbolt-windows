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

namespace passbolt.Models.Messaging
{
    public abstract class Topic
    {
        protected WebView2 background { get; set; }
        protected WebView2 rendered { get; set; }

        public Topic()
        {
            background = null;
            rendered = null;
        }
        public Topic(WebView2 _background, WebView2 _rendered)
        {
            background = _background;
            rendered = _rendered;
        }

        /// <summary>
        /// Process ipc message receive
        /// </summary>
        /// <param name="ipc"></param>
        public abstract void ProceedMessage(IPC ipc);
    }
}
