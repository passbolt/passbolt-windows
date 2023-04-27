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
using passbolt.Utils;

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
                case AllowedTopics.GETSITESETTINGS:
                case AllowedTopics.GETVERSION:
                case AllowedTopics.FINDLOGGEDINUSER:
                case AllowedTopics.GETLOCALE:
                case AllowedTopics.GETALLROLES:
                case AllowedTopics.GETALLRESOURCETYPE:
                case AllowedTopics.FINDALLRESOURCES:
                case AllowedTopics.UPDATELOCALSTORAGEFOLDERS:
                case AllowedTopics.UPDATELOCALSTORAGEGROUPS:
                case AllowedTopics.UPDATELOCALSTORAGEUSERS:
                case AllowedTopics.UPDATELOCALSTORAGERESOURCES:
                case AllowedTopics.FINDALLCOMMENTBYRESSOURCE:
                case AllowedTopics.FINDALLACTIONLOGS:
                case AllowedTopics.FINDPERMISSIONSRESSOURCE:
                case AllowedTopics.CREATEFOLDERS:
                case AllowedTopics.UPDATEFOLDERS:
                case AllowedTopics.UPDATERESOURCES:
                case AllowedTopics.CREATERESOURCES:
                case AllowedTopics.DELETECOMMENT:
                case AllowedTopics.DELETEFOLDERS:
                case AllowedTopics.OPENDIALOGFOLDERS:
                case AllowedTopics.CREATECOMMENT:
                case AllowedTopics.FINDALLFOLDERS:
                    AllowedTopics.AddRequestId(ipc.requestId);
                    background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
                    break;
                default:
                    if (AllowedTopics.proceedRequestId(ipc.topic))
                    {
                        rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
                    }
                    else
                    {
                        new UnauthorizedTopicException("Rendered webview");
                    }
                    break;
            }
        }
    }
}
