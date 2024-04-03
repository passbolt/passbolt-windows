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
* @since         0.7.0
*/


using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Exceptions;
using passbolt.Services.NavigationService;

namespace passbolt_windows_tests.UnitTests.Services
{

    [TestClass]
    public class ParseAppUrlServiceTests
    {
        [TestMethod]
        [DataRow("TLD", "https://passbolt.dev/app/folders/view/5452ecb2-0625-50d1-b1ef-d2038f5830b6", "passbolt.dev")]
        [DataRow("TLD with Port", "https://passbolt.dev:4443/Background/passwords", "passbolt.dev:4443")]
        [DataRow("Non tld", "https://passbolt/Rendered/users", "passbolt")]
        [DataRow("IP v4", "https://127.0.0.1/app/administration/mfa", "127.0.0.1")]
        [DataRow("IP v4 with port", "https://127.0.0.1:4443/Background/administration/users-directory", "127.0.0.1:4443")]
        [DataRow("IP v6", "https://[0:0:0:0:0:0:0:1]/app/administration/internationalization", "[0:0:0:0:0:0:0:1]")]
        [DataRow("IP v6 with port", "https://[0:0:0:0:0:0:0:1]:4443/app/administration/subscription", "[0:0:0:0:0:0:0:1]:4443")]
        [DataRow("Trailing /", "https://passbolt.dev/app/administration/app/account-recovery//", "passbolt.dev")]
        [DataRow("Hash on domain", "https://demo.passbolt.com/Background/#hash", "demo.passbolt.com")]
        [DataRow("Hash in subpaths", "https://demo.passbolt.com/app/users#hash", "demo.passbolt.com")]
        public void ShouldParse(string scenario, string url, string domain)
        {
            try
            {
                ParseAppUrlService.Parse(domain, url);
            }
            catch (Exception ex)
            {
                Assert.Fail($"Should parse: {scenario} for {url}. Error: {ex.Message}");
            }
        }

        [TestMethod]
        [DataRow("No domain", "/passwords")]
        [DataRow("Not a domain allowed", "https://passbolt.io/passwords")]
        [DataRow("Original domain as subdomain attack", "https://passbolt.dev.attacker.com")]
        [DataRow("Subdomain attack", "https://attack.passbolt.dev")]
        [DataRow("Regex wild mark attack", "https://passboltxdev")]
        [DataRow("Non application entry point", "https://passbolt.dev/auth/login")]
        [DataRow("Domain look alike as hash attack", "https://www.attacker.com#$passbolt.dev")]
        public void ShouldNotParse(string scenario, string url)
        {
            Assert.ThrowsException<InvalidDomainException>(() => ParseAppUrlService.Parse("passbolt.dev", url),
            $"Should not parse: {scenario}");
        }


        [TestMethod]
        public void ShouldEscapeCharactersFromDomain()
        {
            var pattern = ParseAppUrlService.GetRegex("passbolt.dev/#/");
            Assert.AreEqual(pattern.ToString(), "^https://passbolt\\.dev/\\#/(?:/(?:Background|Rendered|app).*)?(#.*)?$");
        }
    }
}