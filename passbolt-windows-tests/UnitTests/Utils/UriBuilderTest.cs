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

        [TestMethod]
        [Description("Should treat urls sharing the exact same origin as trusted")]
        public void IsSameOrigin_SameOrigin_ReturnsTrue()
        {
            Assert.IsTrue(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com/auth/verify.json", "https://cloud.passbolt.com"));
            //Different paths on the same origin still match
            Assert.IsTrue(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com/", "https://cloud.passbolt.com/mfa/verify/duo"));
            //Host comparison is case insensitive
            Assert.IsTrue(UriBuilderHelper.IsSameOrigin("https://CLOUD.passbolt.com/x", "https://cloud.passbolt.com"));
            //Default port is normalized
            Assert.IsTrue(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com:443/x", "https://cloud.passbolt.com"));
        }

        [TestMethod]
        [Description("Should reject look-alike hosts, scheme or port mismatches, and unparsable input")]
        public void IsSameOrigin_DifferentOrigin_ReturnsFalse()
        {
            //The reported look-alike host: a prefix match but a different origin
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com.attacker.tld/api", "https://cloud.passbolt.com"));
            //Userinfo trick: the real host is attacker.tld
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com@attacker.tld/api", "https://cloud.passbolt.com"));
            //Scheme mismatch
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin("http://cloud.passbolt.com/api", "https://cloud.passbolt.com"));
            //Port mismatch
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com:8443/api", "https://cloud.passbolt.com"));
            //Fails closed on null, empty or unparsable input
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin("https://cloud.passbolt.com/api", null));
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin(null, "https://cloud.passbolt.com"));
            Assert.IsFalse(UriBuilderHelper.IsSameOrigin("not a url", "https://cloud.passbolt.com"));
        }
    }
}
