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
using passbolt.Services.Mfa;

namespace passbolt_windows_tests.UnitTests.Services
{
    [TestClass]
    public class MfaServiceTests
    {
        [TestMethod]
        public void IsDuoUrl_DuoProviderUrl_ReturnsTrue()
        {
            Assert.IsTrue(MfaService.Instance.IsDuoUrl("https://api-1234abcd.duosecurity.com"));
            Assert.IsTrue(MfaService.Instance.IsDuoUrl("https://api-1234abcd.duosecurity.com/frame/prompt"));
        }

        [TestMethod]
        public void IsDuoUrl_NonDuoUrl_ReturnsFalse()
        {
            //Wrong domain
            Assert.IsFalse(MfaService.Instance.IsDuoUrl("https://api-1234abcd.attacker.com/frame"));
            //Missing api- prefix
            Assert.IsFalse(MfaService.Instance.IsDuoUrl("https://1234abcd.duosecurity.com"));
            //Non hexadecimal subdomain
            Assert.IsFalse(MfaService.Instance.IsDuoUrl("https://api-zzzz.duosecurity.com"));
            //Trusted domain
            Assert.IsFalse(MfaService.Instance.IsDuoUrl("https://cloud.passbolt.com/mfa/verify/duo"));
        }
    }
}
