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

namespace passbolt.Models.Messaging.Topics
{
    public class UserTopics
    {
        public const string FIND_LOGGED_IN_USER = "passbolt.users.find-logged-in-user";
        public const string UPDATE_LOCALSTORAGE = "passbolt.users.update-local-storage";
        public const string GET_ALL = "passbolt.users.get-all";
        public const string CREATE = "passbolt.users.create";
        public const string UPDATE = "passbolt.users.update";
        public const string DELETE_DRY_RUN = "passbolt.users.delete-dry-run";
        public const string DELETE = "passbolt.users.delete";
        public const string RESEND_INVITE = "passbolt.users.resend-invite";
        public const string UPDATE_SECURITY_TOKEN = "passbolt.users.update-security-token";
        public const string UPDATE_PRIVATE_KEY = "passbolt.user.update-private-key";
    }
}
