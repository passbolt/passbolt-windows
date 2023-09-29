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
 * @since         0.4.0
 */

using Windows.UI.Xaml.Controls;

namespace passbolt.Models.Messaging.Topics
{
    public class MfaTopics
    {
        public const string HAS_POSPONE_MFA_INVITATION = "passbolt.mfa-policy.has-user-postponed-user-setting-invitation";
        public const string POSPONE_MFA_INVITATION = "passbolt.mfa-policy.postpone-user-setting-invitation";
        public const string GET_POLICY = "passbolt.mfa-policy.get-policy";
        public const string GET_MFA_SETTINGS = "passbolt.mfa-policy.get-mfa-settings";
        public const string VERIFY_PROVIDER = "passbolt.mfa-setup.verify-provider";
        public const string REMOVE_TOTP = "passbolt.mfa-setup.remove-provider";
        public const string VERIFY_TOTP_CODE = "passbolt.mfa-setup.verify-totp-code";
        public const string VERIFY_YUBIKEY_CODE = "passbolt.mfa-setup.verify-yubikey-code";
    }
}
