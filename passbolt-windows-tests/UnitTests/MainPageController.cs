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

        [TestInitialize]
        public void TestInitialize()
        {
            frame = (Frame)Window.Current.Content;
            page = (MainPage)frame.Content;
            webviewBackground = ReflectionUtil.GetPrivateProperty<WebView2>(page, "webviewBackground");
            webviewRendered = ReflectionUtil.GetPrivateProperty<WebView2>(page, "webviewRendered");
            var controller = ReflectionUtil.GetPrivateField<MainController>(page, "mainController");
            backgroundFolder = ReflectionUtil.GetPrivateField<StorageFolder>(controller, "backgroundFolder");
            renderedFolder = ReflectionUtil.GetPrivateField<StorageFolder>(controller, "renderedFolder");
            mainController = (MockMainController)ReflectionUtil.SetPrivatefield<MainController>(page, "mainController", new MockMainController(webviewRendered, webviewBackground, backgroundFolder, renderedFolder));
        }

        [UITestMethod]
        public void LoadRenderedWebviewTest() {
            // Assert
            Assert.IsNotNull(webviewRendered);
            //Should initialized the folderStorage
            Assert.IsNotNull(webviewBackground);
            Assert.AreEqual("http://desktop.passbolt.com/index.html", webviewRendered.Source.ToString());
        }

        [UITestMethod]
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
        public void ShouldBlockNewWindowRequested()
        {
            //Check the variable to not be defined 
            Assert.IsNull(mainController.newWindowRequestedEventArgs);

            this.mainController.SetWebviewSettings(webviewBackground);
            // Wait for the navigation to complete
            var operation = webviewBackground.CoreWebView2.ExecuteScriptAsync("window.open(\"facebook.com\")");
            operation.Completed += (info, status) =>
            {
                Assert.IsTrue(mainController.newWindowRequestedEventArgs.Handled);
            };
        }

    }

}
