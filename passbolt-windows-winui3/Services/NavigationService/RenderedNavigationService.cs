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

using passbolt_windows_winui3.Services.Mfa;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace passbolt_windows_winui3.Services.NavigationService
{
    public class RenderedNavigationService : AbstractNavigationService
    {
        private static readonly RenderedNavigationService instance = new RenderedNavigationService();

        private RenderedNavigationService() { }

        public static RenderedNavigationService Instance { get => instance; }

        public void Initialize(string url)
        {
            //Check the url validity before settings
            this.trustedUrl = url;
            var escaptedUrl = Regex.Escape(url);

            base.allowedUrls = new List<Regex>()
        {
            new Regex($"^https://{escaptedUrl}/Rendered/(index-import\\.html|index-auth\\.html|index-workspace\\.html)$"),
            new Regex($"^https://{escaptedUrl}/(?:app/passwords/view/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{escaptedUrl}/app/passwords$"),
            new Regex($"^https://{escaptedUrl}/(?:app/folders/view/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{escaptedUrl}/(?:app/groups/(view|edit)/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{escaptedUrl}/(?:app/users/view/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{escaptedUrl}/app/users$"),
            new Regex($"^https://{escaptedUrl}/app/settings/(mfa|profile|passphrase|keys|security-token|theme|account-recovery)"),
            };
        }

        /// <summary>
        /// Allow navigation to the API for MFA urls
        /// </summary>
        /// <param name="url"></param>
        public void AllowMfaUrls(string trustedDomain)
        {
            var mfaUrls = MfaService.Instance.InitMfaUrls(trustedDomain);
            base.allowedUrls.AddRange(mfaUrls);
        }

        /// <summary>
        /// Disable navigation to extra urls which and not the rendered URL
        /// </summary>
        public void DisallowMfaUrls()
        {
            this.Initialize(this.trustedUrl);
        }


        /// <summary>
        /// Check if webview can open browser to passbolt URI
        /// </summary>
        public async Task CanOpenBrowser(string url)
        {
            if (url.StartsWith("https://help.passbolt.com/") || url.StartsWith("https://www.passbolt.com/") || url == "https://en.wikipedia.org/wiki/Phishing")
            {
                await Windows.System.Launcher.LaunchUriAsync(new Uri(url));
            }
        }
    }
}
