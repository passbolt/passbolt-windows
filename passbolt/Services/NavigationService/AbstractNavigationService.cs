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
    }
}
