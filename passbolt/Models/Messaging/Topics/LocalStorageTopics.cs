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
    public class LocalStorageTopics
    {
        public const string BACKGROUND_LOCALSTORAGE_UPDATE = "passbolt.background.localstorage-update";
        public const string BACKGROUND_LOCALSTORAGE_CLEAR = "passbolt.background.localstorage-clear";
        public const string BACKGROUND_LOCALSTORAGE_DELETE = "passbolt.background.localstorage-delete";
    }
}
