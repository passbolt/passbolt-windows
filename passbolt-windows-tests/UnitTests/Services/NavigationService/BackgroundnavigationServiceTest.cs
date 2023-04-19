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
    public class BackgroundNavigationServiceTests
    {
        private BackgroundNavigationService _navigationService;

        [TestInitialize]
        public void TestInitialize()
        {
            _navigationService = new BackgroundNavigationService();
        }

        [TestMethod]
        public void CanNavigate_ValidUrl_ReturnsTrue()
        {
            // Arrange
            string url = "http://01234567-89ab-cdef-0123-456789abcdef/index.html";

            // Act
            bool result = _navigationService.canNavigate(url);

            // Assert
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void CanNavigate_InvalidUrl_ReturnsFalse()
        {
            // Arrange
            string url = "http://example.com";

            // Act
            bool result = _navigationService.canNavigate(url);

            // Assert
            Assert.IsFalse(result);
        }
    }
}
