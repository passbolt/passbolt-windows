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
 * @since         1.1.0
 */

import CheckAuthStatusService from "passbolt-browser-extension/src/all/background_page/service/auth/checkAuthStatusService";
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import BuildApiClientOptionsService from "passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService";

const AUTH_SESSION_CHECK_ALARM = "AuthSessionCheck";

class AuthSessionCheckService {
  /**
   * Check if the user is authenticated when the AuthSessionCheck alarm triggers.
   * @param {Alarm} alarm
   * @returns {Promise<void>}
   * @private
   */
  static async handleAuthStatusCheckAlarm(alarm) {
    if (alarm.name !== AuthSessionCheckService.ALARM_NAME) {
      return;
    }

    const account = await GetLegacyAccountService.get();
    const apiClientOptions = await BuildApiClientOptionsService.buildFromAccount(account);
    const checkAuthService = new CheckAuthStatusService(account, apiClientOptions);
    const authStatus = await checkAuthService.checkAuthStatus(true);
    if (!authStatus.isAuthenticated) {
      window.chrome.webview.postMessage(JSON.stringify({topic: "passbolt.auth.after-logout"}));
    }
  }

  /**
   * Returns the alarm names that this service handles
   * @return {string}
   */
  static get ALARM_NAME() {
    return AUTH_SESSION_CHECK_ALARM;
  }
}

export default AuthSessionCheckService;
