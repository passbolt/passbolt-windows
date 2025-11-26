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
    public class ResourceTopics
    {
        public const string FIND_ALL_IDS_BY_IS_SHARED_WITH_GROUP = "passbolt.resources.find-all-ids-by-is-shared-with-group";
        public const string UPDATE_LOCALSTORAGE = "passbolt.resources.update-local-storage";
        public const string UPDATE = "passbolt.resources.update";
        public const string CREATE = "passbolt.resources.create";
        public const string DELETE_ALL = "passbolt.resources.delete-all";
        public const string GET_GRID_SETTING = "passbolt.resources.get-grid-setting";
        public const string SET_GRID_SETTING = "passbolt.resources.set-grid-setting";
        public const string FIND_DETAILS = "passbolt.resources.find-details";
        public const string FIND_ALL_BY_IDS_FOR_DISPLAY_PERMISSIONS = "passbolt.resources.find-all-by-ids-for-display-permissions";
        public const string MOVE_BY_IDS = "passbolt.resources.move-by-ids";
        public const string RESOURCES_UPDATE_LOCAL_STORAGE_BY_FOLDER_PARENT_ID = "passbolt.resources.update-local-storage-by-folder-parent-id";
    }
}
