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

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace passbolt.Services.NavigationService
{
    public abstract class AbstractNavigationService
    {
        protected List<Regex> allowedUrls;
        public string trustedUrl { get; set; }
        public bool canNavigate(string url)
        {
            foreach (Regex regex in allowedUrls)
            {
                if (regex.IsMatch(url))
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// Check if the given url is hosted on the webview virtual host.
        /// Used by the navigation guard to know when a webview is leaving or
        /// coming back to its virtual host (eg. during an external MFA flow).
        /// </summary>
        /// <param name="url"></param>
        /// <returns>bool</returns>
        public bool IsVirtualHost(string url)
        {
            if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(this.trustedUrl))
            {
                return false;
            }

            return Uri.TryCreate(url, UriKind.Absolute, out Uri uri) && uri.Host == this.trustedUrl;
        }
    }
}
