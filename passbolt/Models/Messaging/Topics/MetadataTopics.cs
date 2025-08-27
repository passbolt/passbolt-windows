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
 * @since         1.4.0
 */

namespace passbolt.Models.Messaging.Topics
{
    public class MetadataTopics
    {
        public const string GET_OR_FIND_METADATA_TYPES_SETTINGS = "passbolt.metadata.get-or-find-metadata-types-settings";
        public const string SHARE_MISSING_METADATA_PRIVATE_KEYS_WITH_USER = "passbolt.metadata.share-missing-metadata-private-keys-with-user";
        public const string GET_OR_FIND_METADATA_KEYS_SETTINGS = "passbolt.metadata.get-or-find-metadata-keys-settings";
    }
}
