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
using passbolt.Services.NavigationService;

namespace passbolt_windows_tests.UnitTests.Services
{
    [TestClass]
    public class RenderedNavigationServiceTests
    {

        public RenderedNavigationServiceTests( )
        {
            RenderedNavigationService.Instance.Initialize("desktop.passbolt.com");
        }

        [TestMethod]
        public void CanNavigate_WebviewHostUrl_ReturnsTrue()
        {
           string url = "https://desktop.passbolt.com/Rendered/index.html";

            bool result = RenderedNavigationService.Instance.canNavigate(url);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void CanNavigate_PasswordWorkspace_ReturnsTrue()
        {
            string workspaceUrl = "https://desktop.passbolt.com/app/passwords";
            string passwordViewUrl = "https://desktop.passbolt.com/app/passwords/view/a8734e0a-3587-42f6-ab15-f9239cf1ce68";
            string folderViewUrl = "https://desktop.passbolt.com/app/folders/view/57341148-2e61-4f1a-88f7-250b95faffae";

            bool resultWorkspace = RenderedNavigationService.Instance.canNavigate(workspaceUrl);
            bool resultPasswordView = RenderedNavigationService.Instance.canNavigate(passwordViewUrl);
            bool resultFolderView = RenderedNavigationService.Instance.canNavigate(folderViewUrl);

            Assert.IsTrue(resultWorkspace);
            Assert.IsTrue(resultPasswordView);
            Assert.IsTrue(resultFolderView);
        }


        [TestMethod]
        public void CanNavigate_InvalidUrl_ReturnsFalse()
        {
            string url = "http://invalid.com";
            bool result = RenderedNavigationService.Instance.canNavigate(url);

            Assert.IsFalse(result);
        }
    }
}
