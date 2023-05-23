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
    public class ResourceTopics
    {
        public const string FIND_ALL = "passbolt.resources.find-all";
        public const string UPDATE_LOCALSTORAGE = "passbolt.resources.update-local-storage";
        public const string FIND_PERMISSION = "passbolt.resources.find-permissions";
        public const string UPDATE = "passbolt.resources.update";
        public const string CREATE = "passbolt.resources.create";
        public const string DELETE_ALL = "passbolt.resources.delete-all";
        public const string GET_ALL = "passbolt.resource-type.get-all";
    }
}
