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
using passbolt.Models.Authentication;
using passbolt.Models.CredentialLocker;
using passbolt.Models.Messaging.Topics;
using passbolt.Models.Rbac;
using passbolt.Services.CredentialLocker;
using passbolt.Services.DownloadService;
using passbolt.Services.LocalFolder;
using passbolt.Services.NavigationService;
using passbolt.Services.RbacService;
using passbolt.Services.WebviewService;
using passbolt.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace passbolt.Models.Messaging
{
    public class BackgroundTopic : WebviewTopic
    {
        private CredentialLockerService credentialLockerService;
        private string currentIndexBackground = "index-auth.html";
        private string currentIndexRendered = "index-auth.html";
        private string passphrase;
        private string pendingRequestId;

        public BackgroundTopic(WebView2 background, WebView2 rendered, LocalFolderService localFolderService, BackgroundWebviewService backgroundWebviewService) : base(background, rendered, localFolderService, backgroundWebviewService)
        {
            credentialLockerService = new CredentialLockerService();
            passphrase = null;
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
                    //It means we have a single navigation of the Background webview
                    if(this.pendingRequestId != null)
                    {
                        this.proceedPendingRequest();
                    }
                    else
                    {
                        //Basic behaviour
                        rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AllowedTopics.BACKGROUND_READY)));
                        if (passphrase != null)
                        {
                            background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AllowedTopics.BACKGROUND_STORE_PASSPHRASE, passphrase)));
                            rendered.Source = new Uri(UriBuilderHelper.BuildHostUri(RenderedNavigationService.Instance.currentUrl, "/Rendered/index-workspace.html"));
                            passphrase = null;
                        }
                    }
                    break;
                case AuthenticationTopics.REQUIRE_MFA:
                    var message = SerializationHelper.DeserializeFromJson<MfaAuthentication>(((JObject)ipc.message).ToString());
                    passphrase = message.passphrase;

                    // Allow navigation for MFA authentication
                    RenderedNavigationService.Instance.AllowMfaUrls(accountMetaData.domain);
                    rendered.Source = new Uri(accountMetaData.domain + $"/mfa/verify/{message.provider}?redirect=/");
                    break;
                case AuthImportTopics.SAVE_ACCOUNT:
                    this.currentIndexBackground = "index-auth.html";
                    this.currentIndexRendered = "index-import.html";
                    pendingRequestId = SerializationHelper.DeserializeFromJson<RequestId>(((JObject)ipc.message).ToString()).requestId;
                    var metaData = SerializationHelper.DeserializeFromJson<AccountMetaData>(((JObject)ipc.message).ToString());
                    var secrets = SerializationHelper.DeserializeFromJson<AccountSecret>(((JObject)ipc.message).ToString());
                    await this.credentialLockerService.CreateAccount(metaData, secrets);
                    //We remove previous virtualhost and create a new one based on trusted domain
                    await this.webviewService.SetVirtualHost();
                    await localFolderService.CreateBackgroundIndex(this.currentIndexBackground, "background-auth", metaData.domain);
                    background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.currentUrl, "/Background/index-auth.html"));
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
                    this.currentIndexBackground = "index-auth.html";
                    this.currentIndexRendered = "index-auth.html";
                    await localFolderService.RemoveFile("Rendered", "index-workspace.html");
                    await localFolderService.RemoveFile("Background", "index-workspace.html");
                    await localFolderService.CreateRenderedIndex(this.currentIndexRendered, "rendered-auth", "ext_authentication.min.css", accountMetaData.domain);
                    await localFolderService.CreateBackgroundIndex(this.currentIndexBackground, "background-auth", accountMetaData.domain);
                    background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.currentUrl, "/Background/index-auth.html"));
                    rendered.Source = new Uri(UriBuilderHelper.BuildHostUri(RenderedNavigationService.Instance.currentUrl, "/Rendered/index-auth.html"));
                    break;
                case AuthenticationTopics.AFTER_LOGIN:
                    passphrase = (string)ipc.message;
                    await RedirectToWorkspace();
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
                    } else if (AllowedTopics.HasPendingRequest(ipc.topic))
                    {
                        var value = AllowedTopics.GetPendingRequest(ipc.topic);
                        this.mapResponse(ipc, value);
                        AllowedTopics.RemovePendingRequest(ipc.topic);
                    }
                    rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
                    break;
            }
        }

        /// <summary>
        /// Create folder for workspace and redirect user to workspace
        /// </summary>
        /// <param name="accountMeta"></param>
        public async Task RedirectToWorkspace()
        {
            var accountMetaData = await this.credentialLockerService.GetAccountMetadata();
            await localFolderService.RemoveFile("Rendered", this.currentIndexRendered);
            await localFolderService.RemoveFile("Background", this.currentIndexBackground);
            await localFolderService.CreateRenderedIndex("index-workspace.html", "rendered-workspace", "ext_app.min.css", accountMetaData.domain);
            await localFolderService.CreateBackgroundIndex("index-workspace.html", "background-workspace", accountMetaData.domain);
            background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.currentUrl, "/Background/index-workspace.html"));
        }

        /// <summary>
        /// Proceed a pending request Id
        /// </summary>
        public void proceedPendingRequest()
        {
            AllowedTopics.proceedRequestId(this.pendingRequestId);
            var icpMessage = new IPC();
            icpMessage.status = "SUCCESS";
            icpMessage.topic = this.pendingRequestId;
            rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(icpMessage));
            this.pendingRequestId = null;
        }

        /// <summary>
        /// Map the response from the background webview
        /// </summary>
        /// <param name="ipc"></param>
        /// <returns></returns>
        public void mapResponse(IPC ipc, string topic)
        {
            if (topic == RbacTopics.FIND_ME)
            {
                var rbacService = new RbacService();
                var controls = SerializationHelper.DeserializeFromJson<List<ControlFunction>>(((JArray)ipc.message).ToString());
                rbacService.AddDesktopRbac(controls);
                ipc.message = controls;
            }
        }
    }
}
