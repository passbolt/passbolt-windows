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
* @since         0.0.2
 */

namespace passbolt_windows_winui3.Models.Messaging.Topics
{
    public class AccountRecoveryTopics
    {
        public const string GET_USER_REQUESTS = "passbolt.account-recovery.get-user-requests";
        public const string GET_ORGANIZATION_POLICY = "passbolt.account-recovery.get-organization-policy";
        public const string REVIEW_REQUEST = "passbolt.account-recovery.review-request";
        public const string GET_REQUEST = "passbolt.account-recovery.get-request";
        public const string VALIDATE_ORGANIZATION_PRIVATE_KEY = "passbolt.account-recovery.validate-organization-private-key";
    }
}
