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
* @since         0.4.0
 */

using System.ComponentModel.DataAnnotations;

namespace passbolt_windows_winui3.Models.Authentication
{
    public class MfaAuthentication
    {
        [Required]
        public string provider { get; set; }
        [Required]
        public string passphrase { get; set; }
    }
}
