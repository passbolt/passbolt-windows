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

namespace passbolt.Models.Messaging.Topics
{
    public class TagTopics
    {
        public const string FIND_ALL = "passbolt.tags.find-all";
        public const string ADD = "passbolt.tags.add-resources-tag";
        public const string UPDATE = "passbolt.tags.update";
        public const string DELETE = "passbolt.tags.delete";
        public const string UPDATE_RESOURCE_TAGS = "passbolt.tags.update-resource-tags";
    }
}
