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
    public class FolderTopics
    {
        public const string CREATE = "passbolt.folders.create";
        public const string UPDATE = "passbolt.folders.update";
        public const string DELETE = "passbolt.folders.delete";
        public const string OPEN_DIALOG = "passbolt.folders.move-by-id";
        public const string UPDATE_LOCALSTORAGE = "passbolt.folders.update-local-storage";
        public const string SELECT_AND_SCROLL_TO = "passbolt.folders.select-and-scroll-to";
        public const string MOVE_STRATEGY_REQUEST = "passbolt.folders.move-strategy.request";
        public const string FIND_DETAILS = "passbolt.folders.find-details";
    }
}
