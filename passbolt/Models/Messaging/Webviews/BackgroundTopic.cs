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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using passbolt.Exceptions;
using passbolt.Models.Authentication;
using passbolt.Models.Cookies;
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
using Windows.ApplicationModel.DataTransfer;

namespace passbolt.Models.Messaging
{
    public class BackgroundTopic : WebviewTopic
    {
        private CredentialLockerService credentialLockerService;
        private string currentIndexBackground = "index-auth.html";
        private string currentIndexRendered = "index-auth.html";
        private string passphrase;
        private string pendingRequestId;
        private RbacService rbacService;
        private CookiesManager cookiesManager;
        private List<IPC> pendingMessages;

        public BackgroundTopic(WebView2 background, WebView2 rendered, LocalFolderService localFolderService, BackgroundWebviewService backgroundWebviewService) : base(background, rendered, localFolderService, backgroundWebviewService)
        {
            credentialLockerService = new CredentialLockerService();
            passphrase = null;
            this.rbacService = new RbacService();
            cookiesManager = CookiesManager.Instance;
            pendingMessages = new List<IPC>();
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
                        WebviewOrchestratorService.Instance.SetBackgroundStatus(true);
                        if(WebviewOrchestratorService.Instance.AreAllReady())
                        {
                            rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AllowedTopics.BACKGROUND_READY)));
                            background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AllowedTopics.RENDERED_READY)));
                        }
                        if (passphrase != null)
                        {
                            background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(AllowedTopics.BACKGROUND_STORE_PASSPHRASE, passphrase)));
                            rendered.Source = new Uri(UriBuilderHelper.BuildHostUri(RenderedNavigationService.Instance.trustedUrl, "/Rendered/index-workspace.html"));
                            passphrase = null;
                        }
                    }
                    break;
                case AllowedTopics.BACKGROUND_GET_COOKIE:
                    string cookie = cookiesManager.getCookie((string)ipc.message);
                    var response = new IPC();
                    response.message = cookie;
                    response.status = "SUCCESS";
                    response.topic = ipc.requestId;
                    background.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(response));
                    break;
                case AllowedTopics.BACKGROUND_SET_THEME:
                    accountMetaData.theme = (string) ipc.message;
                    await this.credentialLockerService.Create("account-metadata", JsonConvert.SerializeObject(accountMetaData));
                    break;
                case AllowedTopics.BACKGROUND_SET_LOCALE:
                    accountMetaData.locale = (string)ipc.message;
                    await this.credentialLockerService.Create("account-metadata", JsonConvert.SerializeObject(accountMetaData));
                    break;
                case AllowedTopics.BACKGROUND_SET_SECURITY_TOKEN:
                    accountMetaData.securityToken = SerializationHelper.DeserializeFromJson<SecurityToken>(((JObject)ipc.message).ToString());
                    await this.credentialLockerService.Create("account-metadata", JsonConvert.SerializeObject(accountMetaData));
                    break;
                case AllowedTopics.BACKGROUND_ROTATE_KEY:
                    var accountSecret = await this.credentialLockerService.GetAccountSecret();
                    accountSecret.userPrivateArmoredKey = (string)ipc.message;
                    await this.credentialLockerService.Create("account-secret", JsonConvert.SerializeObject(accountSecret));
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
                    var backgroundUrl = await this.webviewService.SetVirtualHost();
                    await localFolderService.CreateBackgroundIndex(this.currentIndexBackground, "background-auth", metaData.domain);
                    background.Source = new Uri(UriBuilderHelper.BuildHostUri(backgroundUrl, "/index-auth.html"));
                    break;
                case AllowedTopics.BACKGROUND_AUTHENTICATION_ERROR:
                    //This case can happen when a certificate and/or the API cannot be reached. In this case we cancel the account saving and redirect background to import
                    if(currentIndexRendered == "index-import.html" && currentIndexBackground == "index-auth.html")
                    {
                        await this.credentialLockerService.Remove("account-metadata");
                        await this.credentialLockerService.Remove("account-secret");
                        await localFolderService.RemoveFile("Background", "index-auth.html");
                        await localFolderService.CreateBackgroundIndex(this.currentIndexBackground, "background-import");
                        background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.trustedUrl, "/Background/index-import.html"));
                    }
                    break;
                case AllowedTopics.BACKGROUND_DOWNLOAD_FILE:
                    var downloadService = new DownloadService();
                    await downloadService.Download(ipc);
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_UPDATE:
                    if(this.canProceedMessage(ipc))
                    {
                        rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(LocalStorageTopics.RENDERED_LOCALSTORAGE_UPDATE, SerializationHelper.SerializeToJson(ipc.message))));
                    }
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_DELETE:
                    if (this.canProceedMessage(ipc))
                    {
                        rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(LocalStorageTopics.RENDERED_LOCALSTORAGE_DELETE, (string)ipc.message)));
                    }
                    break;
                case LocalStorageTopics.BACKGROUND_LOCALSTORAGE_CLEAR:
                    if (this.canProceedMessage(ipc))
                    {
                        rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(new IPC(LocalStorageTopics.RENDERED_LOCALSTORAGE_CLEAR)));
                    }
                    break;
                case AuthenticationTopics.LOG_OUT:
                    this.currentIndexBackground = "index-auth.html";
                    this.currentIndexRendered = "index-auth.html";
                    await localFolderService.RemoveFile("Rendered", "index-workspace.html");
                    await localFolderService.RemoveFile("Background", "index-workspace.html");
                    await localFolderService.CreateRenderedIndex(this.currentIndexRendered, "rendered-auth", "ext_authentication.min.css", accountMetaData.domain);
                    await localFolderService.CreateBackgroundIndex(this.currentIndexBackground, "background-auth", accountMetaData.domain);
                    background.Source = new Uri(UriBuilderHelper.BuildHostUri(BackgroundNavigationService.Instance.trustedUrl, "/Background/index-auth.html"));
                    rendered.Source = new Uri(UriBuilderHelper.BuildHostUri(RenderedNavigationService.Instance.trustedUrl, "/Rendered/index-auth.html"));
                    break;
                case AuthenticationTopics.AFTER_LOGIN:
                    passphrase = (string)ipc.message;
                    await RedirectToWorkspace();
                    break;
                case SecretTopics.PASSPHRASE_REQUEST:
                case ProgressTopics.PROGRESSCLOSEDIALOG:
                case ProgressTopics.PROGRESSUPDATE:
                case ProgressTopics.PROGRESSUPDATEGOALS:
                case ProgressTopics.PROGRESSOPENDIALOG:
                case AllowedTopics.BACKGROUND_AFTER_LOGOUT:
                case FolderTopics.MOVE_STRATEGY_REQUEST:
                    if (ipc.requestId != null)
                    {
                        AllowedTopics.AddRequestId(ipc.requestId);
                    }
                    if (this.canProceedMessage(ipc))
                    {
                        rendered.CoreWebView2.PostWebMessageAsJson(SerializationHelper.SerializeToJson(ipc));
                    }
                    break;
                case AllowedTopics.BACKGROUND_CLIPBOARD_SET_TEXT:
                    DataPackage dataPackage = new DataPackage();
                    dataPackage.SetText((string)ipc.message);
                    Clipboard.SetContent(dataPackage);
                    break;
                default:
                    if (!AllowedTopics.proceedRequestId(ipc.topic))
                    {
                        return;
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
            var configuration = await credentialLockerService.GetApplicationConfiguration();
            background.Source = new Uri(UriBuilderHelper.BuildHostUri(configuration.backgroundUrl, "/Background/index-workspace.html"));
        }

        /// <summary>
        /// Process all pending messages when Rendered webview becomes ready
        /// </summary>
        public void ProcessPendingMessages()
        {
            if (pendingMessages.Count > 0)
            {
                var messages = new List<IPC>(pendingMessages);

                foreach (var message in messages)
                {
                    ProceedMessage(message);
                }

                pendingMessages.Clear();
            }
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
                var controls = SerializationHelper.DeserializeFromJson<List<ControlFunction>>(((JArray)ipc.message).ToString());
                this.rbacService.AddDesktopRbac(controls);
                ipc.message = controls;
            }
        }

        /// <summary>
        /// Check if the rendered webview is listening and if not we add the ipc message as pending
        /// This method should be added before calling each topic calling the rendered webview
        /// </summary>
        /// <param name="ipc"></param>
        /// <returns bool></returns>
        private bool canProceedMessage(IPC ipc)
        {
            if (!WebviewOrchestratorService.Instance.IsRenderedReady() && ipc.topic != AllowedTopics.BACKGROUND_READY)
            {
                pendingMessages.Add(ipc);
                return false;
            }

            return true;
        }
    }
}
