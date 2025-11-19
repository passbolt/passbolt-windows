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

using Newtonsoft.Json;

namespace passbolt_windows_winui3.Models.LocalStorage
{
    public class PassboltConfig
    {
        [JsonProperty("user.settings.securityToken.code")]
        public string SecurityCode { get; set; }
        [JsonProperty("user.settings.securityToken.color")]
        public string SecurityColor { get; set; }
        [JsonProperty("user.settings.securityToken.textColor")]
        public string SecurityTextColor { get; set; }
        [JsonProperty("user.settings.trustedDomain")]
        public string TrustedDomain { get; set; }
        [JsonProperty("user.id")]
        public string UserId { get; set; }
        [JsonProperty("user.username")]
        public string Username { get; set; }
        [JsonProperty("user.lastname")]
        public string Lastname { get; set; }
        [JsonProperty("user.firstname")]
        public string Firstname { get; set; }
    }
}
