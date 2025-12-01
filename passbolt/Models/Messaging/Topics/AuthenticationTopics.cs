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
    public class AuthenticationTopics
    {
        public const string VERIFY_PASSPHRASE = "passbolt.auth.verify-passphrase";
        public const string DESKTOP_AUTHENTICATE = "passbolt.auth.login";
        public const string AFTER_LOGIN = "passbolt.auth.after-login";
        public const string IS_AUTHENTICATED = "passbolt.auth.is-authenticated";
        public const string VERIFY_SERVER = "passbolt.auth.verify-server-key";
        public const string GET_SERVER_KEY = "passbolt.auth.get-server-key";
        public const string SET_SERVER_KEY = "passbolt.auth.replace-server-key";
        public const string LOG_OUT = "passbolt.auth.logout";
        public const string POST_LOGIN_REDIRECT = "passbolt.auth.post-login-redirect";
        public const string REQUIRE_MFA = "passbolt.auth.redirect-to-mfa";
    }
}
