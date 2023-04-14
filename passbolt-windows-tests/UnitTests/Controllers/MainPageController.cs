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
using System.Text.RegularExpressions;
using Microsoft.UI.Xaml.Controls;
using Windows.Storage;
using passbolt_windows_tests.Utils;
using passbolt.Controllers;
using passbolt_windows_tests.UnitTests;
using System;
using passbolt.Utils;
using System.Threading.Tasks;
using Microsoft.Web.WebView2.Core;
using static System.Net.WebRequestMethods;

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
        private StorageFolder backgroundFolder;
        private StorageFolder renderedFolder;
        private string renderedUrl = "http://desktop.passbolt.com/index.html";
        private string attackerUrl = "http://attacker-background.com";
        private string validUrl = "";

        [TestInitialize]
        public void TestInitialize()
        {
            if(frame == null) {
                frame = (Frame)Window.Current.Content;
                page = (MainPage)frame.Content;
                webviewBackground = ReflectionUtil.GetPrivateProperty<WebView2>(page, "webviewBackground");
                webviewRendered = ReflectionUtil.GetPrivateProperty<WebView2>(page, "webviewRendered");
                var controller = ReflectionUtil.GetPrivateField<MainController>(page, "mainController");
                backgroundFolder = ReflectionUtil.GetPrivateField<StorageFolder>(controller, "backgroundFolder");
                renderedFolder = ReflectionUtil.GetPrivateField<StorageFolder>(controller, "renderedFolder");
                mainController = (MockMainController)ReflectionUtil.SetPrivatefield<MainController>(page, "mainController", new MockMainController(webviewRendered, webviewBackground, backgroundFolder, renderedFolder));
            }
        }

        [UITestMethod]
        [Description("As a desktop application I want to launch a rendered webview")]
        public void LoadRenderedWebviewTest() {
            // Assert
            Assert.IsNotNull(webviewRendered);
            //Should initialized the webview
            Assert.AreEqual(renderedUrl, webviewRendered.Source.ToString());
            //Should initialized the folderStorage
            Assert.IsNotNull(renderedFolder);
        }

        [UITestMethod]
        [Description("As a desktop application I want to launch a background webview")]
        public void LoadBackgroundWebviewTest()
        {
            var url = webviewBackground.Source.ToString();

            // Assert
            string pattern = @"^http:\/\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/index\.html$";
            bool isMatch = Regex.IsMatch(webviewBackground.Source.ToString(), pattern);
            Assert.IsTrue(isMatch);

            // Call LoadBackgroundWebview asynchronously and wait for it to complete
            var task = this.mainController.LoadBackgroundWebview();
            task.Wait();
            //Should initialized the folderStorage
            Assert.IsNotNull(backgroundFolder);
            // Check that the url has changed
            Assert.IsTrue(url != webviewBackground.Source.ToString());
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
            webviewRendered.Source = new Uri(renderedUrl);
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
                Assert.AreEqual(renderedUrl, webviewRendered.Source.ToString());
            };
        }

        [UITestMethod]
        [Description("As a desktop application I want to validate the navigation for background webview - success")]
        public void ShouldValidateBackgroundWebviewNavigationSuccess()
        {
            String backgroundUrl = mainController.GeneratateRandomBackgroundHost(webviewBackground);
            validUrl = backgroundUrl.ToString();
            webviewBackground.CoreWebView2.NavigationCompleted += async (sender, args) =>
            {
                Assert.AreEqual(backgroundUrl.ToString(), webviewBackground.Source.ToString());
                Assert.IsTrue(args.IsSuccess);
            };

            webviewRendered.CoreWebView2.NavigationCompleted -= this.Rendered_NavigationCompletedError;
            webviewBackground.CoreWebView2.NavigationCompleted += this.Background_NavigationCompletedSuccess;

            //Check a valid url 
            webviewBackground.CoreWebView2.Navigate(validUrl);
        }

        [UITestMethod]
        [Description("As a desktop application I want to validate the navigation for background webview - error")]
        public void ShouldValidateBackgroundWebviewNavigationError()
        {
            string randomUrl = new Uri(UriBuiler.BuildHostUri(Guid.NewGuid().ToString(), "index.html")).ToString();
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


        /// <summary>
        /// Navigation completed with success for testing
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        public void Background_NavigationCompletedSuccess(CoreWebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            Assert.AreEqual(validUrl, webviewBackground.Source.ToString());
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
            Assert.AreEqual(validUrl, webviewRendered.Source.ToString());
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
    }
}