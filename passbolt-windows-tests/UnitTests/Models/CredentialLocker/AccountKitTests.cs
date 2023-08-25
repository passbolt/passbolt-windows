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
using passbolt.Models.CredentialLocker;


namespace passbolt_windows_tests.UnitTests.Models.CredentialLocker
{
    [TestClass]
    public class AccountKitTests
    {
        [TestMethod]
        public void Constructor_SetsAccountMetaDataAndAccountSecret()
        {
            // Arrange
            var accountMetaData = new AccountMetaData();
            var accountSecret = new AccountSecret();

            // Act
            var accountKit = new AccountKit(accountMetaData, accountSecret);

            // Assert
            Assert.AreEqual(accountMetaData, accountKit.accountMetaData);
            Assert.AreEqual(accountSecret, accountKit.accountSecret);
        }

        [TestMethod]
        public void Properties_SetAndGetAccountMetaDataAndAccountSecret()
        {
            // Arrange
            var accountMetaData = new AccountMetaData();
            var accountSecret = new AccountSecret();
            var accountKit = new AccountKit(new AccountMetaData(), new AccountSecret());

            // Act
            accountKit.accountMetaData = accountMetaData;
            accountKit.accountSecret = accountSecret;

            // Assert
            Assert.AreEqual(accountMetaData, accountKit.accountMetaData);
            Assert.AreEqual(accountSecret, accountKit.accountSecret);
        }
    }
}
