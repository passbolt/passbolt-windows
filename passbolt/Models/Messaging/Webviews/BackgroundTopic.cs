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
using passbolt.Models.CredentialLocker;
using passbolt.Models.Messaging.Topics;
using passbolt.Services.CredentialLocker;
using passbolt.Services.DownloadService;
using passbolt.Services.LocalFolder;
using passbolt.Services.LocalStorage;
using passbolt.Services.NavigationService;
using passbolt.Services.WebviewService;
using passbolt.Utils;
using System;

namespace passbolt.Models.Messaging
{
    public class BackgroundTopic : WebviewTopic
    {
        private LocalStorageService localStorageService;
        private RenderedWebviewService renderedWebviewService;
        private CredentialLockerService credentialLockerService;
        private string currentIndex = "index-auth.html";

        public BackgroundTopic(WebView2 background, WebView2 rendered, LocalFolderService localFolderService) : base(background, rendered, localFolderService)
        {
            localStorageService = new LocalStorageService();
            renderedWebviewService = new RenderedWebviewService(rendered.CoreWebView2);
            credentialLockerService = new CredentialLockerService();
        }

        /// <summary>
        /// Process ipc message receive for Background webview
        /// </summary>
        /// <param name="ipc"></param>
        public async override void ProceedMessage(IPC ipc)
        {
            var accountMetaData = await this.credentialLockerService.GetAccountMetadata();

            switch (ipc.topic)
            {
                case AllowedTopics.BACKGROUND_READY:
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AllowedTopics.BACKGROUND_READY)));
                    break;
                case AuthImportTopics.SAVE_ACCOUNT:
                    this.currentIndex = "index-import.html";
                    var metaData = SerializationHelper.DeserializeFromJson<AccountMetaData>(((JObject) ipc.message).ToString());
                    var secrets = SerializationHelper.DeserializeFromJson<AccountSecret>(((JObject)ipc.message).ToString());
                    await this.credentialLockerService.CreateAccount(metaData, secrets);
                    background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(ipc.requestId, "SUCCESS", null))) ;
                    break;
                case AllowedTopics.BACKGROUND_DOWNLOAD_FILE:
                    var downloadService = new DownloadService();
                    await downloadService.Download(ipc);
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_UPDATE:
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(LocalStorageTopics.RENDERED_LOCALSTORAGE_UPDATE, SerializationHelper.SerializeToJson(ipc.message))));
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_DELETE:
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(LocalStorageTopics.RENDERED_LOCALSTORAGE_DELETE, (string)ipc.message)));
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_CLEAR:
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(LocalStorageTopics.RENDERED_LOCALSTORAGE_CLEAR)));
                    break;
                case AuthenticationTopics.LOG_OUT:
                    await localFolderService.RemoveFile("Rendered", "index-workspace.html");
                    await localFolderService.RemoveFile("Background", "index-workspace.html");
                    await localFolderService.CreateRenderedIndex("index-auth.html", "rendered-auth", "ext_authentication.min.css", accountMetaData.domain);
                    await localFolderService.CreateBackgroundIndex("index-auth.html", "background-auth", accountMetaData.domain);
                    background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.currentUrl, "/Background/index-auth.html"));
                    break;
                case AuthenticationTopics.AFTER_LOGIN:
                    await localFolderService.RemoveFile("Rendered", this.currentIndex);
                    await localFolderService.RemoveFile("Background", this.currentIndex);
                    await localFolderService.CreateRenderedIndex("index-workspace.html", "rendered-workspace", "ext_app.min.css", accountMetaData.domain);
                    await localFolderService.CreateBackgroundIndex("index-workspace.html", "background-workspace", accountMetaData.domain);
                    background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.currentUrl, "/Background/index-workspace.html"));
                    rendered.Source = new Uri(UriBuilderHelper.BuildHostUri(RenderedNavigationService.Instance.currentUrl, "/Rendered/index-workspace.html"));
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
