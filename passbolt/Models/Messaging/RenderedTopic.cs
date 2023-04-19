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

using System.Diagnostics;
using Microsoft.UI.Xaml.Controls;
using passbolt.Exceptions;

namespace passbolt.Models.Messaging
{
    public class RenderedTopic : Topic
    {

        public RenderedTopic(WebView2 background, WebView2 rendered) : base(background, rendered){}


        /// <summary>
        /// Proceed IPC message for rendered webviews
        /// </summary>
        /// <param name="ipc"></param>
        public override void ProceedMessage(IPC ipc)
        {
            switch (ipc.topic)
            {
                case AllowedTopics.INITIALIZATION:
                    Debug.Write("Rendered webview initialized");
                    break;
                default: 
                    new UnauthorizedTopicException("Rendered webview");
                    break;
            }
        }
    }
}
