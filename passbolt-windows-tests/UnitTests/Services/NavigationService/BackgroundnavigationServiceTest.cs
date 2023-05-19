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
        private string url = "desktop.passbolt.com/Background";

        public BackgroundNavigationServiceTests()
        {
            _navigationService = new BackgroundNavigationService("desktop.passbolt.com/Background");
        }

        [TestMethod]
        public void CanNavigate_ValidUrl_ReturnsTrue()
        {
            string backgroundUrl = String.Concat("https://", url, "/index.html");
            _navigationService = new BackgroundNavigationService(url);

            bool result = _navigationService.canNavigate(backgroundUrl);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void CanNavigate_InvalidUrl_ReturnsFalse()
        {
            string url = "https://example.com";

            bool result = _navigationService.canNavigate(url);

            Assert.IsFalse(result);
        }
    }
}
