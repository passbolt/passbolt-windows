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
        public const string FINDALLRESOURCES = "passbolt.resources.find-all";
        public const string UPDATELOCALSTORAGERESOURCES = "passbolt.resources.update-local-storage";
        public const string FINDPERMISSIONSRESSOURCE = "passbolt.resources.find-permissions";
        public const string UPDATERESOURCES = "passbolt.resources.update";
        public const string CREATERESOURCES = "passbolt.resources.create";
        public const string DELETEALLRESOURCES = "passbolt.resources.delete-all";
        public const string GETALLRESOURCETYPE = "passbolt.resource-type.get-all";
    }
}
