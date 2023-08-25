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
    public class AccountSecretTests
    {
        private string userId = "6b97f765-f1bd-4f1c-9cc5-f03bbb591a66";
        private string userPrivateArmoredKey = "-----BEGIN PGP PRIVATE KEY BLOCK-----\n\n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\n=kkPj\n-----END PGP PRIVATE KEY BLOCK-----\n";
        private AccountSecret accountSecret;
        public AccountSecretTests()
        {
            this.accountSecret = new AccountSecret
            {
                userPrivateArmoredKey = userPrivateArmoredKey,
                userId = userId,
            };
        }

        [TestMethod]
        public void Properties_SetAndGetValues()
        {
            Assert.AreEqual(userId, accountSecret.userId);
            Assert.AreEqual(userPrivateArmoredKey, accountSecret.userPrivateArmoredKey);
        }

        [TestMethod]
        public void Should_DeserializeAccountKit()
        {
            string json = File.ReadAllText("Mocks/Data/account_kit.json");

            var deserializedAccountSecret = JsonConvert.DeserializeObject<AccountSecret>(json);

            Assert.AreEqual(accountSecret.userId, deserializedAccountSecret.userId);
            Assert.AreEqual(accountSecret.userPrivateArmoredKey, deserializedAccountSecret.userPrivateArmoredKey);
        }
    }
}


