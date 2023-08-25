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
using System.IO;


namespace passbolt_windows_tests.UnitTests.Models.CredentialLocker
{
    [TestClass]
    public class AccountMetaDataTests
    {

        private string userName = "admin@passbolt.com";
        private string domain = "https://www.passbolt.local";
        private string userId = "6b97f765-f1bd-4f1c-9cc5-f03bbb591a66";
        private string firstName = "Admin";
        private string lastName = "Admin";
        private SecurityToken securityToken = new SecurityToken() {
            code = "GYG",
            color = "#8bc34a",
            textColor = "#000000"        
        };
        private string serverPublicArmoredKey = "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n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\npw==\n=/Wuk\n-----END PGP PUBLIC KEY BLOCK-----\n";
        private AccountMetaData accountMetaData;
        public AccountMetaDataTests()
        {
            this.accountMetaData = new AccountMetaData
            {
                domain = domain,
                userId = userId,
                userName = userName,
                firstName = firstName,
                lastName = lastName,
                securityToken = securityToken,
                serverPublicArmoredKey = serverPublicArmoredKey,
            };
        }

        [TestMethod]
        public void Properties_SetAndGetValues()
        {
            Assert.AreEqual(domain, accountMetaData.domain);
            Assert.AreEqual(userId, accountMetaData.userId);
            Assert.AreEqual(userName, accountMetaData.userName);
            Assert.AreEqual(firstName, accountMetaData.firstName);
            Assert.AreEqual(lastName, accountMetaData.lastName);
            Assert.AreEqual(securityToken, accountMetaData.securityToken);
            Assert.AreEqual(serverPublicArmoredKey, accountMetaData.serverPublicArmoredKey);
        }

        [TestMethod]
        public void Should_DeserializeAccountKit()
        {
            string json = File.ReadAllText("Mocks/Data/account_kit.json");

            var deserializedAccountMetaData = JsonConvert.DeserializeObject<AccountMetaData>(json);

            Assert.AreEqual(domain, deserializedAccountMetaData.domain);
            Assert.AreEqual(userId, deserializedAccountMetaData.userId);
            Assert.AreEqual(userName, deserializedAccountMetaData.userName);
            Assert.AreEqual(firstName, deserializedAccountMetaData.firstName);
            Assert.AreEqual(lastName, deserializedAccountMetaData.lastName);
            Assert.AreEqual(serverPublicArmoredKey, deserializedAccountMetaData.serverPublicArmoredKey);
            Assert.AreEqual(securityToken.color, deserializedAccountMetaData.securityToken.color);
            Assert.AreEqual(securityToken.textColor, deserializedAccountMetaData.securityToken.textColor);
            Assert.AreEqual(securityToken.code, deserializedAccountMetaData.securityToken.code);

        }
    }
}
