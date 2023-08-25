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

using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Services.NavigationService;

namespace passbolt_windows_tests.UnitTests.Services
{
    [TestClass]
    public class BackgroundNavigationServiceTests
    {
        private BackgroundNavigationService _navigationService;

        public BackgroundNavigationServiceTests()
        {
             BackgroundNavigationService.Instance.Initialize("desktop.passbolt.com");
        }

        [TestMethod]
        public void CanNavigate_ValidUrl_ReturnsTrue()
        {
            string urlAuth = "https://desktop.passbolt.com/Background/index-auth.html";
            string urlWorkspace = "https://desktop.passbolt.com/Background/index-workspace.html";

            bool resultAuthHtml = BackgroundNavigationService.Instance.canNavigate(urlAuth);
            bool resultWorkspaceHtml = BackgroundNavigationService.Instance.canNavigate(urlWorkspace);

            Assert.IsTrue(resultAuthHtml);
            Assert.IsTrue(resultWorkspaceHtml);
        }

        [TestMethod]
        public void CanNavigate_InvalidUrl_ReturnsFalse()
        {
            string url = "https://example.com";

            bool result = BackgroundNavigationService.Instance.canNavigate(url);

            Assert.IsFalse(result);
        }
    }
}
