/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.0.1
 */

using passbolt.Services.Mfa;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace passbolt.Services.NavigationService
{
    public class RenderedNavigationService : AbstractNavigationService
    {
        private static readonly RenderedNavigationService instance = new RenderedNavigationService();

        private RenderedNavigationService() { }

        public static RenderedNavigationService Instance { get => instance; }

        public void Initialize(string currentUrl)
        {
            this.currentUrl = currentUrl;

            string pattern = $"^https://{this.currentUrl}/Rendered/(index-import\\.html|index-auth\\.html|index-workspace\\.html)$";

            base.allowedUrls = new List<Regex>()
        {
            new Regex(@pattern),
            new Regex($"^https://{currentUrl}/(?:app/passwords/view/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{currentUrl}/app/passwords$"),
            new Regex($"^https://{currentUrl}/(?:app/folders/view/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{currentUrl}/(?:app/groups/(view|edit)/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{currentUrl}/(?:app/users/view/[0-9a-fA-F]{{8}}-[0-9a-fA-F]{{4}}-[1-5][0-9a-fA-F]{{3}}-[89abAB][0-9a-fA-F]{{3}}-[0-9a-fA-F]{{12}})(?:#)?$"),
            new Regex($"^https://{currentUrl}/app/users$"),
            new Regex($"^https://{currentUrl}/app/settings/mfa(?:#)?$"),
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
            this.Initialize(this.currentUrl);
        }
    }
}
