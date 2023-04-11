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

namespace passbolt_windows_tests
{
    [TestClass]
    public class MainPageTests
    {

        private MainPage page;
        private Frame frame;

        [TestInitialize]
        public void TestInitialize()
        {
            frame = (Frame)Window.Current.Content;
            page = (MainPage)frame.Content;
        }

        [UITestMethod]
        public void LoadRenderedWebviewTest() { 
             // Assert
            Assert.IsNotNull(page.webviewRendered);
            Assert.AreEqual<string>("http://desktop.passbolt.com/index.html", page.webviewRendered.Source.ToString());
        }

        [UITestMethod]
        public void LoadBackgroundWebviewTest()
        {
            var url = page.webviewBackground.Source.ToString();
            // Assert
            string pattern = @"^http:\/\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}\/index\.html$";
            bool isMatch = Regex.IsMatch(page.webviewBackground.Source.ToString(), pattern);
            Assert.IsTrue(isMatch);

            // Call LoadBackgroundWebview asynchronously and wait for it to complete
            var task = page.LoadBackgroundWebview();
            task.Wait();

            // Check that the url has changed
            Assert.IsTrue(url != page.webviewBackground.Source.ToString());

        }
    }

}
