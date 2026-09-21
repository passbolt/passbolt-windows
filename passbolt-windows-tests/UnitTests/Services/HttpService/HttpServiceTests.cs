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
using Microsoft.Web.WebView2.Core;
using passbolt.Services.HttpService;
using passbolt.Services.Mfa;
using passbolt.Services.NavigationService;

namespace passbolt_windows_tests.UnitTests.Services
{
    [TestClass]
    public class HttpServiceTests
    {
        private HttpService _httpService;
        private const string RenderedVirtualHost = "renderedguid.passbolt.local";
        private const string BackgroundVirtualHost = "backgroundguid.passbolt.local";
        private const string TrustedDomain = "https://cloud.passbolt.com";
        private const string DuoUrl = "https://api-1234abcd.duosecurity.com/frame/prompt";

        [TestInitialize]
        public void TestInitialize()
        {
            _httpService = new HttpService();
            _httpService.setTrustedDomain(TrustedDomain);
            //The virtual hosts are owned by the navigation services (single source of truth)
            RenderedNavigationService.Instance.trustedUrl = RenderedVirtualHost;
            BackgroundNavigationService.Instance.trustedUrl = BackgroundVirtualHost;
            //The Duo domain is an MFA state owned by the MfaService, re-scoped on each new MFA process
            MfaService.Instance.InitMfaUrls(TrustedDomain);
        }

        [TestMethod]
        public void IsResourceAllowed_RenderedAssetsFromDistHost_ReturnsTrue()
        {
            Assert.IsTrue(_httpService.IsResourceAllowed("https://rendered.dist/Rendered/dist/rendered-workspace.js", CoreWebView2WebResourceContext.Script, true));
            Assert.IsTrue(_httpService.IsResourceAllowed("https://rendered.dist/Rendered/dist/themes/default.css", CoreWebView2WebResourceContext.Stylesheet, true));
            Assert.IsTrue(_httpService.IsResourceAllowed("https://rendered.dist/Rendered/fonts/icon.woff2", CoreWebView2WebResourceContext.Font, true));
            Assert.IsTrue(_httpService.IsResourceAllowed("https://rendered.dist/Rendered/img/logo.png", CoreWebView2WebResourceContext.Image, true));
        }

        [TestMethod]
        public void IsResourceAllowed_BackgroundScriptFromDistHost_ReturnsTrue()
        {
            Assert.IsTrue(_httpService.IsResourceAllowed("https://background.dist/Background/dist/background-workspace.js", CoreWebView2WebResourceContext.Script, false));
        }

        [TestMethod]
        public void IsResourceAllowed_RenderedTrustedDomainAssets_ReturnsTrue()
        {
            //The MFA page is served by the trusted domain and loads its own script, style, font and image from it
            Assert.IsTrue(_httpService.IsResourceAllowed(TrustedDomain + "/js/app/stylesheet.js?v=5.13.0", CoreWebView2WebResourceContext.Script, true));
            Assert.IsTrue(_httpService.IsResourceAllowed(TrustedDomain + "/css/api.min.css", CoreWebView2WebResourceContext.Stylesheet, true));
            Assert.IsTrue(_httpService.IsResourceAllowed(TrustedDomain + "/fonts/icon.woff2", CoreWebView2WebResourceContext.Font, true));
            Assert.IsTrue(_httpService.IsResourceAllowed(TrustedDomain + "/img/logo.png", CoreWebView2WebResourceContext.Image, true));
        }

        [TestMethod]
        public void IsResourceAllowed_BackgroundTrustedDomainScript_ReturnsFalse()
        {
            //The background webview never browses the trusted domain, it only proxies its API (XHR)
            Assert.IsFalse(_httpService.IsResourceAllowed(TrustedDomain + "/js/app/stylesheet.js", CoreWebView2WebResourceContext.Script, false));
        }

        [TestMethod]
        public void IsResourceAllowed_XhrToTrustedDomainAndPowned_ReturnsTrue()
        {
            Assert.IsTrue(_httpService.IsResourceAllowed(TrustedDomain + "/auth/verify.json", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            Assert.IsTrue(_httpService.IsResourceAllowed(TrustedDomain + "/auth/verify.json", CoreWebView2WebResourceContext.XmlHttpRequest, false));
            Assert.IsTrue(_httpService.IsResourceAllowed("https://api.pwnedpasswords.com/range/abcde", CoreWebView2WebResourceContext.XmlHttpRequest, true));
        }

        [TestMethod]
        public void IsResourceAllowed_UntrustedOrigin_ReturnsFalse()
        {
            Assert.IsFalse(_httpService.IsResourceAllowed("https://www.attacker.com/steal", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            Assert.IsFalse(_httpService.IsResourceAllowed("https://www.attacker.com/evil.js", CoreWebView2WebResourceContext.Script, true));
            //Background must not load images, fonts or stylesheets
            Assert.IsFalse(_httpService.IsResourceAllowed("https://background.dist/Background/img/logo.png", CoreWebView2WebResourceContext.Image, false));
            Assert.IsFalse(_httpService.IsResourceAllowed("https://rendered.dist/Rendered/media/clip.mp4", CoreWebView2WebResourceContext.Media, true));
            Assert.IsFalse(_httpService.IsResourceAllowed("wss://rendered.dist/socket", CoreWebView2WebResourceContext.Websocket, true));
        }

        [TestMethod]
        public void IsResourceAllowed_LookAlikeTrustedHost_ReturnsFalse()
        {
            //A host that is only a string prefix of the trusted domain must not be trusted (PB-54780)
            string lookAlike = TrustedDomain + ".attacker.tld";
            Assert.IsFalse(_httpService.IsResourceAllowed(lookAlike + "/auth/verify.json", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            Assert.IsFalse(_httpService.IsResourceAllowed(lookAlike + "/app.js", CoreWebView2WebResourceContext.Script, true));
            Assert.IsFalse(_httpService.IsResourceAllowed(lookAlike + "/logo.png", CoreWebView2WebResourceContext.Image, true));
            //Same weakness on the pwned password origin
            Assert.IsFalse(_httpService.IsResourceAllowed("https://api.pwnedpasswords.com.attacker.tld/range/abcde", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            //Same weakness on the dist host serving the rendered assets
            Assert.IsFalse(_httpService.IsResourceAllowed("https://rendered.dist.attacker.tld/Rendered/dist/rendered-workspace.js", CoreWebView2WebResourceContext.Script, true));
            //Same weakness on the rendered virtual host
            Assert.IsFalse(_httpService.IsResourceAllowed("https://" + RenderedVirtualHost + ".attacker.tld/index.html", CoreWebView2WebResourceContext.Script, true));
        }

        [TestMethod]
        public void IsResourceAllowed_TrustedDomainWithSchemePortOrUserinfoMismatch_ReturnsFalse()
        {
            //Scheme downgrade, non default port and userinfo tricks must all fail the origin check (PB-54780)
            Assert.IsFalse(_httpService.IsResourceAllowed("http://cloud.passbolt.com/auth/verify.json", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            Assert.IsFalse(_httpService.IsResourceAllowed("https://cloud.passbolt.com:8443/auth/verify.json", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            Assert.IsFalse(_httpService.IsResourceAllowed("https://cloud.passbolt.com@attacker.tld/auth/verify.json", CoreWebView2WebResourceContext.XmlHttpRequest, true));
        }

        [TestMethod]
        public void IsResourceAllowed_DuoLookAlikeHost_ReturnsFalse()
        {
            MfaService.Instance.SetDuoUrl(DuoUrl);
            //Even once a Duo domain is captured, a look-alike Duo host must not be trusted (PB-54780)
            Assert.IsFalse(_httpService.IsResourceAllowed("https://api-1234abcd.duosecurity.com.attacker.tld/frame/prompt", CoreWebView2WebResourceContext.Script, true));
        }

        [TestMethod]
        public void IsResourceAllowed_AmplitudeOnlyOnItsAnalyticsEndpoint()
        {
            MfaService.Instance.SetDuoUrl(DuoUrl);
            //The amplitude origin is only allowed on its analytics endpoint path
            Assert.IsTrue(_httpService.IsResourceAllowed("https://api2.amplitude.com/2/httpapi", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            //Query params on the exact path are still allowed (query is not part of the path)
            Assert.IsTrue(_httpService.IsResourceAllowed("https://api2.amplitude.com/2/httpapi?import=1", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            //A real sub path of the endpoint is allowed
            Assert.IsTrue(_httpService.IsResourceAllowed("https://api2.amplitude.com/2/httpapi/batch", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            //A totally different path is rejected
            Assert.IsFalse(_httpService.IsResourceAllowed("https://api2.amplitude.com/steal", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            //A sibling path sharing the endpoint as a string prefix must NOT pass (PB-54780, path level)
            Assert.IsFalse(_httpService.IsResourceAllowed("https://api2.amplitude.com/2/httpapistealer", CoreWebView2WebResourceContext.XmlHttpRequest, true));
            //Look-alike host on the amplitude origin is rejected
            Assert.IsFalse(_httpService.IsResourceAllowed("https://api2.amplitude.com.attacker.tld/2/httpapi", CoreWebView2WebResourceContext.XmlHttpRequest, true));
        }

        [TestMethod]
        public void IsResourceAllowed_DuoUrl_BlockedUntilCapturedThenAllowedForRenderedOnly()
        {
            //Before the Duo domain is captured, Duo and amplitude are blocked
            Assert.IsFalse(_httpService.IsResourceAllowed(DuoUrl, CoreWebView2WebResourceContext.Script, true));
            Assert.IsFalse(_httpService.IsResourceAllowed("https://api2.amplitude.com/2/httpapi", CoreWebView2WebResourceContext.XmlHttpRequest, true));

            //Capture the Duo domain reached during the MFA navigation
            MfaService.Instance.SetDuoUrl(DuoUrl);

            //Allowed for the rendered webview
            Assert.IsTrue(_httpService.IsResourceAllowed(DuoUrl, CoreWebView2WebResourceContext.Script, true));
            Assert.IsTrue(_httpService.IsResourceAllowed(DuoUrl, CoreWebView2WebResourceContext.Image, true));
            Assert.IsTrue(_httpService.IsResourceAllowed("https://api2.amplitude.com/2/httpapi", CoreWebView2WebResourceContext.XmlHttpRequest, true));

            //Never allowed for the background webview
            Assert.IsFalse(_httpService.IsResourceAllowed(DuoUrl, CoreWebView2WebResourceContext.Script, false));

            //A new MFA process re-scopes (resets) the captured Duo domain
            MfaService.Instance.InitMfaUrls(TrustedDomain);
            Assert.IsFalse(_httpService.IsResourceAllowed(DuoUrl, CoreWebView2WebResourceContext.Script, true));
        }
    }
}
