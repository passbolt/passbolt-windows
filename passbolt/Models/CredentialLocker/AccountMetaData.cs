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
* @since         0.0.3
*/

using Newtonsoft.Json;


namespace passbolt.Models.CredentialLocker
{
    public class AccountMetaData
    {

        public AccountMetaData() { }

        [JsonProperty("domain")]
        public string domain { get; set; }
        [JsonProperty("user_id")]
        public string userId { get; set; }
        [JsonProperty("username")]
        public string userName { get; set; }
        [JsonProperty("first_name")]
        public string firstName { get; set; }
        [JsonProperty("last_name")]
        public string lastName { get; set; }
        [JsonProperty("security_token")]
        public SecurityToken securityToken { get; set; }
        [JsonProperty("server_public_armored_key")]
        public string serverPublicArmoredKey { get; set; }
        [JsonProperty("user_public_armored_key")]
        public string userPublicArmoredKey { get; set; }
    }
}
