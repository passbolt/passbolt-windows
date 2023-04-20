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

using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Services.NavigationService;

namespace passbolt_windows_tests.UnitTests.Services
{

    [TestClass]
    public class AbstractNavigationServiceTests
    {
        private AbstractNavigationService _navigationService;

        [TestInitialize]
        public void TestInitialize()
        {
            _navigationService = new MockNavigationService();
        }

        [TestMethod]
        public void CanNavigate_ValidUrl_ReturnsTrue()
        {
            string url = "http://example.com";
            bool result = _navigationService.canNavigate(url);
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void CanNavigate_InvalidUrl_ReturnsFalse()
        {
            string url = "http://invalid.com";
            bool result = _navigationService.canNavigate(url);
            Assert.IsFalse(result);
        }
    }

    internal class MockNavigationService : AbstractNavigationService
    {
        public MockNavigationService()
        {
            base.allowedUrls = new List<Regex>()
                {
                    new Regex(@"^http:\/\/example\.com$"),
                };
        }
    }
}