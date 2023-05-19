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
    public class FolderTopics
    {
        public const string CREATEFOLDERS = "passbolt.folders.create";
        public const string UPDATEFOLDERS = "passbolt.folders.update";
        public const string FINDALLFOLDERS = "passbolt.folders.find-permissions";
        public const string DELETEFOLDERS = "passbolt.folders.delete";
        public const string OPENDIALOGFOLDERS = "passbolt.folders.open-move-confirmation-dialog";
        public const string UPDATELOCALSTORAGEFOLDERS = "passbolt.folders.update-local-storage";
    }
}
