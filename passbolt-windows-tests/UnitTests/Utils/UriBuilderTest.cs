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
using passbolt.Utils;

namespace passbolt_windows_tests.UnitTests
{
    [TestClass]
    public class UriBuilderTest
    {
        string uri = "https://passbolt.local";
        string path = "/api";
        string apiUri;

        public UriBuilderTest()
        {
            apiUri = string.Concat(uri, path);
        }

        [TestMethod]
        [Description("Should return an URI")]
        public void BuildHostUri_ReturnsCorrectUri()
        {
            string host = "passbolt.local";
            string actualUri = UriBuilderHelper.BuildHostUri(host, path);

            Assert.AreEqual(apiUri, actualUri);
        }

        [TestMethod]
        [Description("Should return the host and scheme from the URL")]
        public void GetHostAndSchemeForUri_ValidUri_ReturnsHostAndScheme()
        {
            string result = UriBuilderHelper.GetHostAndShemeForUri(apiUri);

            Assert.AreEqual(uri, result);
        }
    }
}
