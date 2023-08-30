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

using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt;
using Windows.UI.Xaml.Controls;
using Microsoft.VisualStudio.TestTools.UnitTesting.AppContainer;
using Windows.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Windows.Storage;
using passbolt_windows_tests.Utils;
using passbolt.Controllers;
using passbolt_windows_tests.UnitTests;
using System;
using passbolt.Utils;
using Microsoft.Web.WebView2.Core;
using passbolt.Models.LocalStorage;
using passbolt.Services.CredentialLockerService;
using System.Threading.Tasks;
using System.Reflection.Metadata;
using passbolt.Services.NavigationService;
using static System.Net.WebRequestMethods;
using System.Linq;
using System.IO;
using passbolt.Services.LocalFolder;

namespace passbolt_windows_tests
{
    [TestClass]
    public class MainPageTests
    {

        private MainPage page;
        private Frame frame;
        private WebView2 webviewBackground;
        private WebView2 webviewRendered;
        private MockMainController mainController;
        private StorageFolder distfolder;
        private string webviewsURLBackground = "";
        private string webviewsURLRendered = "";
        private string attackerUrl = "http://attacker-background.com";
        private string trustedDomain = "";
        private CredentialLockerService credentialLockerService;
        protected LocalFolderService localFolderService = LocalFolderService.Instance;

        [TestInitialize]
        public void TestInitialize()
        {
            if (frame == null)
            {
                frame = (Frame)Window.Current.Content;
                page = (MainPage)frame.Content;
                webviewBackground = ReflectionUtil.GetPrivateProperty<WebView2>(page, "webviewBackground");
                webviewRendered = ReflectionUtil.GetPrivateProperty<WebView2>(page, "webviewRendered");
                var controller = ReflectionUtil.GetPrivateField<MainController>(page, "mainController");
                credentialLockerService = ReflectionUtil.GetPrivateField<CredentialLockerService>(controller, "credentialLockerService");
                mainController = (MockMainController)ReflectionUtil.SetPrivatefield<MainController>(page, "mainController", new MockMainController(webviewRendered, webviewBackground, credentialLockerService));
                InitialiseWebviewUrl().Wait(7000);
            }
        }

        [UITestMethod]
        [Description("As a desktop application I want to launch the rendered with index-auth.html")]
        public void LoadRenderedWebviewTest()
        {
            Assert.IsNotNull(webviewRendered);
            //Should initialized the webview
            Assert.AreEqual(webviewsURLRendered, webviewRendered.Source.ToString());
        }

        [UITestMethod]
        [Description("As a desktop application I want to launch a background webview with index-workspace.html")]
        public void LoadBackgroundWebviewTest()
        {
            Assert.IsNotNull(webviewBackground);
            //Should initialized the webview
            Assert.AreEqual(webviewsURLBackground, webviewBackground.Source.ToString());
        }


        [UITestMethod]
        [Description("As a desktop application I should not be blocked by CORS when calling API - Should block API which are not trusted")]
        public void WebResourceRequested_ShouldBlockUntrustedDomain()
        {
            var authenticateMessage = "<script>fetch(\"https://www.attacker.com\");</ script>";

            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync(authenticateMessage);
            operation.Completed += (info, status) =>
            {
                mainController.webView2WebResourceResponse.Equals(null);
            };
        }

        [UITestMethod]
        [Description("As a desktop application I should generate the index files for authentication when application started")]
        public void CreateIndexAuthFilesOnStartUp()
        {
            var distfolder = this.localFolderService.GetWebviewsFolder();
            distfolder.GetFoldersAsync().Completed += (result, status) =>
            {
                var folders = result.GetResults();
                folders[0].GetFilesAsync().Completed += (files, statusIndex) =>
                {
                    var backgroundFiles = files.GetResults();
                    Assert.AreEqual(1, backgroundFiles.Count);
                    Assert.AreEqual(backgroundFiles[0].Name, "index-auth.html");
                };

                folders[1].GetFilesAsync().Completed += (files, statusIndex) =>
                {
                    var renderedFiles = files.GetResults();
                    Assert.AreEqual(1, renderedFiles.Count);
                    Assert.AreEqual(renderedFiles[0].Name, "index-auth.html");
                };

                Assert.AreEqual(2, folders.Count);
                Assert.AreEqual(folders[0].Name, "Background");
                Assert.AreEqual(folders[1].Name, "Rendered");

            };
        }

        [UITestMethod]
        [Description("As a desktop application I should generate the index files for workspace after login")]
        public void CreateIndexWorkspaceFilesOnLogin()
        {
            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync("<script>window.chrome.webview.postMessage(JSON.stringify({ topic: 'passbolt.auth.after-login' })</script>");
            operation.Completed += (info, operationStatus) =>
            {
                var distfolder = this.localFolderService.GetWebviewsFolder();
                distfolder.GetFoldersAsync().Completed += (result, status) =>
                {
                    var folders = result.GetResults();
                    folders[0].GetFilesAsync().Completed += (files, statusIndex) =>
                    {
                        var backgroundFiles = files.GetResults();
                        Assert.AreEqual(1, backgroundFiles.Count);
                        Assert.AreEqual(backgroundFiles[0].Name, "index-workspace.html");
                    };

                    folders[1].GetFilesAsync().Completed += (files, statusIndex) =>
                    {
                        var renderedFiles = files.GetResults();
                        Assert.AreEqual(1, renderedFiles.Count);
                        Assert.AreEqual(renderedFiles[0].Name, "index-workspace.html");
                    };
                };
            };
        }

        [UITestMethod]
        [Description("As a desktop application I want to display the password workspace when user is logged in")]
        public void LoadPasswordWorkspace_WhenUserLoggedIn()
        {
            var authenticateMessage = "<script>window.chrome.webview.postMessage(JSON.stringify({topic: 'passbolt.auth.after-login'}));</ script>";

            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync(authenticateMessage);
            operation.Completed += (info, status) =>
            {
                var passboltData = webviewRendered.CoreWebView2.ExecuteScriptAsync("localStorage.getItem('_passbolt_data')");
                passboltData.Completed += (localstorage, webviewStatus) =>
                {
                    var result = passboltData.GetResults();
                    Assert.AreNotEqual(result, "null");
                    // Assert
                    Assert.IsNotNull(webviewRendered);
                    //Should initialized the webview
                    Assert.AreEqual(webviewsURLRendered, webviewRendered.Source.ToString());
                };

            };
        }


        [UITestMethod]
        [Description("As a desktop application I should not be blocked by CORS when calling API")]
        public void WebResourceRequested_ShouldAddHeaders()
        {
            var authenticateMessage = $"<script>fetch(\"{trustedDomain}/movies.json\");</ script>";

            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync(authenticateMessage);
            operation.Completed += (info, status) =>
            {
                Assert.AreEqual(mainController.webView2WebResourceResponse.Headers.GetHeader("Access-Control-Allow-Origin"), trustedDomain);
                Assert.AreEqual(mainController.webView2WebResourceResponse.Headers.GetHeader("Access-Control-Allow-Credentials"), "true");
                Assert.AreEqual(mainController.webView2WebResourceResponse.Headers.GetHeader("Access-Control-Allow-Methods"), "DELETE, POST, GET, OPTIONS, PUT");
                Assert.AreEqual(mainController.webView2WebResourceResponse.Headers.GetHeader("Access-Control-Allow-Headers"), "Content-Type, Authorization, X-Requested-With, x-csrf-token");
            };
        }

        [UITestMethod]
        [Description("As a desktop application I should not be blocked by CORS when calling API - Should send back the option request")]
        public void WebResourceRequested_ShouldSendBackOptionRequest()
        {
            var authenticateMessage = $"<script>fetch(\"{trustedDomain}/movies.json\", {{ method: method: \"OPTION\"  }});</ script>";

            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync(authenticateMessage);
            operation.Completed += (info, status) =>
            {
                Assert.AreEqual(mainController.webView2WebResourceResponse.Content, null);
                Assert.AreEqual(mainController.webView2WebResourceResponse.ReasonPhrase, "Option method");
            };
        }

        [UITestMethod]
        [Description("As a desktop application user I should be informed about the complexity of my password")]
        public void WebResourceRequested_ShouldAllPOWNEDSERVICEAPI()
        {
            var authenticateMessage = $"<script>fetch(\"https://api.pwnedpasswords.com/range/106a6\", {{ method: method: \"GET\"  }});</ script>";

            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync(authenticateMessage);
            operation.Completed += (info, status) =>
            {
                Assert.AreEqual(mainController.webView2WebResourceResponse.StatusCode, 200);
            };
        }

        [UITestMethod]
        [Description("As a desktop user I want to be sure that the webviews cannot open new window")]
        public void ShouldBlockNewWindowRequested()
        {
            //Check the variable to not be defined 
            Assert.IsNull(mainController.newWindowRequestedEventArgs);

            this.mainController.SetWebviewSettings(webviewBackground);
            // Wait for the navigation to complete
            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync("window.open(\"passbolt.com\")");
            operation.Completed += (info, status) =>
            {
                Assert.IsTrue(mainController.newWindowRequestedEventArgs.Handled);
            };
        }


        [UITestMethod]
        [Description("As a desktop app user I want to remove unsecured settings")]
        public void ShouldRemoveUnsecredSettings()
        {
            // Attach events for testing
            webviewBackground.CoreWebView2.ScriptDialogOpening += this.mainController.DomDialogRequested;
            // Should disable devtools 
            Assert.IsFalse(webviewBackground.CoreWebView2.Settings.AreDevToolsEnabled);
            // Should disable contextual menu 
            Assert.IsFalse(webviewBackground.CoreWebView2.Settings.AreDefaultContextMenusEnabled);
            // Should disable autosaved password
            Assert.IsFalse(webviewBackground.CoreWebView2.Settings.IsPasswordAutosaveEnabled);
            // Should disable new host
            Assert.IsFalse(webviewBackground.CoreWebView2.Settings.AreHostObjectsAllowed);
            // Should disable new dialog
            Assert.IsFalse(webviewBackground.CoreWebView2.Settings.AreDefaultScriptDialogsEnabled);
            // Remove swipe navigation
            Assert.IsFalse(webviewBackground.CoreWebView2.Settings.IsSwipeNavigationEnabled);
            // Should disable devtools 
            Assert.IsFalse(webviewRendered.CoreWebView2.Settings.AreDevToolsEnabled);
            // Should disable contextual menu 
            Assert.IsFalse(webviewRendered.CoreWebView2.Settings.AreDefaultContextMenusEnabled);
            // Should disable autosaved password
            Assert.IsFalse(webviewRendered.CoreWebView2.Settings.IsPasswordAutosaveEnabled);
            // Should disable new host
            Assert.IsFalse(webviewRendered.CoreWebView2.Settings.AreHostObjectsAllowed);
            // Should disable new dialog
            Assert.IsFalse(webviewRendered.CoreWebView2.Settings.AreDefaultScriptDialogsEnabled);
            // Remove swipe navigation
            Assert.IsFalse(webviewRendered.CoreWebView2.Settings.IsSwipeNavigationEnabled);

            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync("window.alert(\"passbolt.com\")");
            operation.Completed += (info, status) =>
            {
                Assert.IsFalse(mainController.hasOpenedDialog);
            };
        }

        [UITestMethod]
        [Description("As a desktop application I want to validate the navigation for rendered webview - success")]
        public void ShouldValidateRenderedWebviewNavigationSuccess()
        {
            webviewRendered.CoreWebView2.NavigationCompleted += this.Rendered_NavigationCompletedSuccess;

            //Check a valid url 
            webviewRendered.Source = new Uri(webviewsURLRendered);
        }


        [UITestMethod]
        [Description("As a desktop application I want to validate the navigation for rendered webview - error")]
        public void ShouldValidateRenderedWebviewNavigationError()
        {
            string attackerUrl = "http://attacker-rendered.com";

            webviewRendered.CoreWebView2.NavigationCompleted -= this.Rendered_NavigationCompletedSuccess;
            webviewRendered.CoreWebView2.NavigationCompleted += this.Rendered_NavigationCompletedError;

            //Check an invalid url 
            webviewRendered.Source = new Uri(attackerUrl);

            //Check an invalid url with js injection
            var operation = webviewRendered.CoreWebView2.ExecuteScriptAsync("window.location.href = \"passbolt.com\"");
            operation.Completed += (info, status) =>
            {
                Assert.AreEqual(webviewsURLRendered, webviewRendered.Source.ToString());
            };
        }

        [UITestMethod]
        [Description("As a desktop application I want to validate the navigation for background webview - success")]
        public void ShouldValidateBackgroundWebviewNavigationSuccess()
        {
            webviewBackground.CoreWebView2.NavigationCompleted += (sender, args) =>
            {
                Assert.AreEqual(webviewsURLRendered, webviewBackground.Source.ToString());
                Assert.IsTrue(args.IsSuccess);
            };

            webviewRendered.CoreWebView2.NavigationCompleted -= this.Rendered_NavigationCompletedError;
            webviewBackground.CoreWebView2.NavigationCompleted += this.Background_NavigationCompletedSuccess;

            //Check a valid url 
            webviewBackground.CoreWebView2.Navigate(webviewsURLRendered);
        }

        [UITestMethod]
        [Description("As a desktop application I want to validate the navigation for background webview - error")]
        public void ShouldValidateBackgroundWebviewNavigationError()
        {
            string randomUrl = new Uri(UriBuilderHelper.BuildHostUri(Guid.NewGuid().ToString(), "index.html")).ToString();
            webviewBackground.CoreWebView2.NavigationCompleted -= this.Background_NavigationCompletedSuccess;
            webviewBackground.CoreWebView2.NavigationCompleted += this.Background_NavigationCompletedError;

            //Check an invalid url 
            webviewBackground.CoreWebView2.Navigate("http://attacker-background.com");

            //Check an url which are not virtual hosted
            webviewBackground.CoreWebView2.Navigate(randomUrl);

            //Check an invalid url with js injection
            var operation = webviewRendered.CoreWebView2.ExecuteScriptAsync("window.location.href = \"passbolt.com\"");
            operation.Completed += (info, status) =>
            {
                Console.WriteLine("Location js requested");
            };
        }

        [UITestMethod]
        [Description("As a desktop application I should have a webview url different on each install")]
        public void ShouldChangeWebviewUrlsOnEachInstall()
        {
            var previousBackgroundUrl = webviewBackground.Source.ToString();
            var previousRenderedUrl = webviewRendered.Source.ToString();

            mainController.RemoveConfiguration().Wait();
            mainController.GetConfiguredApplication().Wait();

            Assert.IsTrue(previousBackgroundUrl != mainController.backgroundUrl);
            Assert.IsTrue(previousRenderedUrl != mainController.renderedUrl);
        }

        [UITestMethod]
        [Description("As a desktop application I should have store configuration the Credential locker")]
        public void ShouldStoreConfigurationToTheCredentialLocker()
        {
            Assert.IsNotNull(mainController.applicationConfiguration.backgroundUrl);
            Assert.IsNotNull(mainController.applicationConfiguration.renderedUrl);
        }

        [UITestMethod]
        [Description("As a desktop application when localstorage from background change I should replicate it to rendered webview")]
        public void ShouldReplicateLocalstorageToRendered()
        {
            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync("<script>" +
                "localStorage.setItem('test', 'test');" +
                "window.chrome.webview.postMessage(JSON.stringify({topic: 'passbolt.background.localstorage-update', message: 'test'}));" +
                "</ script>");
            operation.Completed += (info, status) =>
            {
                var renderedLocalstorage = webviewRendered.CoreWebView2.ExecuteScriptAsync("localStorage.getItem('test')");
                renderedLocalstorage.Completed += (localstorage, webviewStatus) =>
                {
                    var result = renderedLocalstorage.GetResults();
                    Assert.AreEqual("test", result);
                };
            };
        }

        [UITestMethod]
        [Description("As a desktop application I should generate the index files for authentication after logout")]
        public void CreateIndexAuthFilesOnLogout()
        {
            var operationLogin = webviewBackground.CoreWebView2.ExecuteScriptAsync("<script>window.chrome.webview.postMessage(JSON.stringify({ topic: 'passbolt.auth.after-login' })</script>");
            operationLogin.Completed += (infoLogin, operationLoginStatus) =>
            {

                var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync("<script>window.chrome.webview.postMessage(JSON.stringify({ topic: 'passbolt.auth.logout' })</script>");
                operation.Completed += (info, operationStatus) =>
                {
                    var distfolder = this.localFolderService.GetWebviewsFolder();
                    distfolder.GetFoldersAsync().Completed += (result, status) =>
                    {
                        var folders = result.GetResults();
                        folders[0].GetFilesAsync().Completed += (files, statusIndex) =>
                        {
                            var backgroundFiles = files.GetResults();
                            Assert.AreEqual(1, backgroundFiles.Count);
                            Assert.AreEqual(backgroundFiles[0].Name, "index-auth.html");
                        };

                        folders[1].GetFilesAsync().Completed += (files, statusIndex) =>
                        {
                            var renderedFiles = files.GetResults();
                            Assert.AreEqual(1, renderedFiles.Count);
                            Assert.AreEqual(renderedFiles[0].Name, "index-auth.html");
                        };
                    };
                };
            };
        }


        [UITestMethod]
        [Description("As a desktop application I want to launch the rendered with index-import.html when no account exist")]
        public void LoadBackgroundWebviewWithoutAccountTest()
        {
            credentialLockerService.Remove("account-metadata").Wait();
            mainController.LoadWebviews().Wait();
            Assert.IsNotNull(webviewRendered);
            //Should initialized the webview
            Assert.IsTrue(webviewBackground.Source.ToString().Contains("Background/index-import.html"));
            Assert.IsTrue(webviewRendered.Source.ToString().Contains("Rendered/index-import.html"));
        }


        /// <summary>
        /// Navigation completed with success for testing
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        public void Background_NavigationCompletedSuccess(CoreWebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Assert.AreEqual(webviewsURLRendered, webviewBackground.Source.ToString());
            Assert.IsTrue(args.IsSuccess);
        }

        /// <summary>
        /// Navigation webviewBackground error with success for testing
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        public void Background_NavigationCompletedError(CoreWebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Assert.AreNotEqual(attackerUrl, webviewBackground.Source.ToString());
            Assert.IsFalse(args.IsSuccess);
        }
        /// <summary>
        /// Navigation webviewRendered completed with success for testing
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        public void Rendered_NavigationCompletedSuccess(CoreWebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Assert.AreEqual(webviewsURLRendered, webviewRendered.Source.ToString());
            Assert.IsTrue(args.IsSuccess);
        }

        /// <summary>
        /// Navigation error with success for testing
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        public void Rendered_NavigationCompletedError(CoreWebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Assert.AreNotEqual(attackerUrl, webviewRendered.Source.ToString());
            Assert.IsFalse(args.IsSuccess);
        }

        /// <summary>
        /// return the trusted domain
        /// </summary>
        public async void GetTrustedDomain()
        {
            string localItem = await webviewBackground.ExecuteScriptAsync("JSON.parse(localStorage.getItem('_passbolt_data'))");
            if (!string.IsNullOrEmpty(localItem))
            {
                var passboltData = SerializationHelper.DeserializeFromJson<PassboltData>(localItem);
                trustedDomain = passboltData.Config.TrustedDomain;
            }
        }

        /// <summary>
        /// initialise the webview url
        /// </summary>
        public async Task InitialiseWebviewUrl()
        {
            if (string.IsNullOrEmpty(webviewsURLRendered))
            {
                await mainController.GetConfiguredApplication();
                webviewsURLBackground = mainController.backgroundUrl + "/Background/index-auth.html";
                webviewsURLRendered = mainController.renderedUrl + "/Rendered/index-auth.html";
            }
        }
    }
}