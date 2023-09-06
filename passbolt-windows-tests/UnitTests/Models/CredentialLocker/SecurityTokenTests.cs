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
* @since         0.0.3
*/

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using passbolt.Models.CredentialLocker;

namespace passbolt_windows_tests.UnitTests.Models.CredentialLocker
{
    [TestClass]
    public class SecurityTokenTests
    {
        [TestMethod]
        public void SecurityToken_Properties_ShouldBeSetAndRetrievedCorrectly()
        {
            // Arrange
            string code = "GYG";
            string color = "#8bc34a";
            string textColor = "#000000";

            SecurityToken token = new SecurityToken
            {
                code = code,
                color = color,
                textColor = textColor
            };

            // Act
            string serializedToken = JsonConvert.SerializeObject(token);
            SecurityToken deserializedToken = JsonConvert.DeserializeObject<SecurityToken>(serializedToken);

            // Assert
            Assert.AreEqual(code, deserializedToken.code);
            Assert.AreEqual(color, deserializedToken.color);
            Assert.AreEqual(textColor, deserializedToken.textColor);
        }
    }
}
