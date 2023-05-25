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

using Microsoft.UI.Xaml.Controls;
using Newtonsoft.Json.Linq;
using passbolt.Exceptions;
using passbolt.Models.Messaging.Topics;
using passbolt.Services.LocalStorage;
using passbolt.Services.NavigationService;
using passbolt.Utils;
using System;
using System.ServiceModel.Channels;
using Windows.UI.Xaml;

namespace passbolt.Models.Messaging
{
    public class BackgroundTopic : WebviewTopic
    {
        private LocalStorageService localStorageService;
        public BackgroundTopic(WebView2 background, WebView2 rendered) : base(background, rendered) {
            localStorageService = new LocalStorageService();
        }

        /// <summary>
        /// Process ipc message receive for Background webview
        /// </summary>
        /// <param name="ipc"></param>
        public async override void ProceedMessage(IPC ipc)
        {
            switch (ipc.topic)
            {
                case AllowedTopics.BACKGROUND_READY:
                    background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AuthenticationTopics.DESKTOPAUTHENTICATE)));
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_UPDATE:
                    await this.localStorageService.LoadLocalStorage(background, rendered, (string) ipc.message) ;
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_DELETE:
                    await this.localStorageService.RemoveLocalStorage(rendered, (string)ipc.message);
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_CLEAR:
                    await this.localStorageService.ClearLocalStorage(rendered);
                    break;
                case AuthenticationTopics.AFTERLOGIN:
                    rendered.Visibility = Visibility.Visible;
                    rendered.Source = new Uri(UriBuilderHelper.BuildHostUri(RenderedNavigationService.Instance.currentUrl, "/Rendered/index.html"));
                    localStorageService.InitPassboltData(rendered, SerializationHelper.SerializeToJson(ipc.message));
                    break;
                case ProgressTopics.PROGRESSCLOSEDIALOG:
                case ProgressTopics.PROGRESSUPDATE:
                case ProgressTopics.PROGRESSUPDATEGOALS:
                case ProgressTopics.PROGRESSOPENDIALOG:
                    if (ipc.requestId != null)
                    {
                        AllowedTopics.AddRequestId(ipc.requestId);
                    }
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
                    break;
                default:
                    if (!AllowedTopics.proceedRequestId(ipc.topic))
                    {
                        throw new UnauthorizedTopicException("Rendered webview");
                    }
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
                    break;
            }
        }
    }
}
