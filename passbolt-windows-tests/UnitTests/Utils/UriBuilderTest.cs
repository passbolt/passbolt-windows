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
using passbolt.Utils;

namespace passbolt_windows_tests.UnitTests
{
    [TestClass]
        public class UriBuilderTest
    {
        [TestMethod]
        [Description("Should return an URI")]
        public void BuildHostUri_ReturnsCorrectUri()
        {
            // Arrange
            string host = "example.com";
            string path = "/home";
            string expectedUri = "http://example.com/home";

            // Act
            string actualUri = UriBuiler.BuildHostUri(host, path);

            // Assert
            Assert.AreEqual(expectedUri, actualUri);
        }
    }
}
