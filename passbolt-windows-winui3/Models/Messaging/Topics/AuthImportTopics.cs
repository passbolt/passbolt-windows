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
* @since         0.3.0
 */


namespace passbolt_windows_winui3.Models.Messaging.Topics
{
    public class AuthImportTopics
    {
        public const string VALIDATE_ACCOUNT_KIT = "passbolt.background.verify-account-kit";
        public const string VERIFY_PASSPHRASE = "passbolt.auth-import.verify-passphrase";
        public const string IMPORT_ACCOUNT = "passbolt.auth-import.import-account";
        public const string SAVE_ACCOUNT = "passbolt.background.save-account";
        public const string IMPORT_SIGN_IN = "passbolt.auth-import.sign-in";
    }
}
