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
 * @since         0.0.1
 */

using System;
using System.Collections.Generic;
using Microsoft.UI.Xaml.Controls;
using passbolt.Exceptions;
using passbolt.Models.Messaging.Topics;
using passbolt.Services.LocalFolder;
using passbolt.Services.WebviewService;
using passbolt.Utils;

namespace passbolt.Models.Messaging
{
    public class RenderedTopic : WebviewTopic
    {
        private List<string> topics = new List<string>();

        public RenderedTopic(WebView2 background, WebView2 rendered, LocalFolderService localFolderService, RenderedWebviewService renderedWebviewService) : base(background, rendered, localFolderService, renderedWebviewService) {
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AccountRecoveryTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ActionLogsTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AuthenticationTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AuthImportTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(BrowserTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(CommentTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(FavoriteTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(FolderTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(GroupTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ImportExportTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(LocaleTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(KeyringTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PownedPasswordTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PasswordGeneratorTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PasswordPoliciesTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(RbacTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ResourceTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(RoleTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(SecretTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(SettingTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ShareTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(TagTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(UserTopics)));
        }


        /// <summary>
        /// Proceed IPC message for rendered webviews
        /// </summary>
        /// <param name="ipc"></param>
        public override async void ProceedMessage(IPC ipc)
        {
            if (!topics.Contains(ipc.topic) && !AllowedTopics.proceedRequestId(ipc.topic))
            {
                new UnauthorizedTopicException("Rendered webview");
                return;
            }
            else if (CanOpenToBrowser(ipc))
            {
                var url = (string)ipc.message;
                await Windows.System.Launcher.LaunchUriAsync(new Uri(url));
            }
            else if (topics.Contains(ipc.topic))
            {
                AllowedTopics.AddRequestId(ipc.requestId);
            } 


            background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
        }

        /// <summary>
        /// Check if the uwp main process can open the browser url
        /// </summary>
        /// <param name="ipc"></param>
        /// <returns></returns>
        public bool CanOpenToBrowser(IPC ipc)
        {
            if (!(ipc.message is string))
            {
                return false;
            }

            var url = (string)ipc.message;
            //We allow by default the passbolt help url, more will come
            return url.StartsWith("https://help.passbolt.com/");
        }
    }
}
