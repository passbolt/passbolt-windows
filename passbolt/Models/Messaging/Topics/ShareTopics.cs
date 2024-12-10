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
 * @since         0.0.2
 */

namespace passbolt.Models.Messaging.Topics
{
    public class ShareTopics
    {
        public const string GET_FOLDERS = "passbolt.share.get-folders";
        public const string SAVE_RESOURCES = "passbolt.share.resources.save";
        public const string SAVE_FOLDERS = "passbolt.share.folders.save";
        public const string SEARCH_AROS = "passbolt.share.search-aros";
    }
}
