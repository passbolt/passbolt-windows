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
 * @since         0.0.3
 */

using Microsoft.UI.Xaml.Controls;
using passbolt.Utils;
using System;

namespace passbolt.Models.Messaging
{
    public static class Messaging
    {
        public static void Send(WebView2 webview, string topic, Object data) {
            var message = new IPC(topic, SerializationHelper.SerializeToJson(data));
            webview.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(message));
            AllowedTopics.AddRequestId(message.requestId);
        }
    }
}
