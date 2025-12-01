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

namespace passbolt.Models.Messaging.Topics
{
    public class GroupTopics
    {
        public const string UPDATE_LOCALESTORAGE = "passbolt.groups.update-local-storage";
        public const string FINDALL = "passbolt.groups.find-all";
        public const string CREATE = "passbolt.groups.create";
        public const string UPDATE = "passbolt.groups.update";
        public const string DELETE = "passbolt.groups.delete";
        public const string DELETE_DRY_RUN = "passbolt.groups.delete-dry-run";
        public const string FIND_MY_GROUPS = "passbolt.groups.find-my-groups";
    }
}
