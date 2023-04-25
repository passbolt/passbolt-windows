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
using passbolt.Exceptions;
using System.Diagnostics;

namespace passbolt.Models.Messaging
{
    public class BackgroundTopic : Topic
    {

        public BackgroundTopic(WebView2 background, WebView2 rendered) : base(background, rendered) { }

        /// <summary>
        /// Process ipc message receive for Background webview
        /// </summary>
        /// <param name="ipc"></param>
        public override void ProceedMessage(IPC ipc)
        {
            switch (ipc.topic)
            {
                case AllowedTopics.INITIALIZATION:
                    Debug.Write("Background webview initialized");
                    break;
                default:
                    new UnauthorizedTopicException("Background webview");
                    break;
            }
        }
    }
}
