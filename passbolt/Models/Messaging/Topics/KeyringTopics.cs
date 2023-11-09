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
    public class KeyringTopics
    {
        public const string GET_PUBLIC_KEY_INFO_BY_USER = "passbolt.keyring.get-public-key-info-by-user";
        public const string GET_KEY_INFO = "passbolt.keyring.get-key-info";
        public const string DOWNLOAD_MY_PRIVATE_KEY = "passbolt.keyring.download-my-private-key";
        public const string DOWNLOAD_MY_PUBLIC_KEY = "passbolt.keyring.download-my-public-key";
        public const string CHECK_PASSPHRASE = "passbolt.keyring.private.checkpassphrase";
    }
}
