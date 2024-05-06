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

const AUTH_SESSION_CHECK_ALARM = "AuthSessionCheck";

class StartLoopAuthSessionCheckService {
  /**
   * Check if the user is authenticated when the AuthSessionCheck alarm triggers.
   * @param {Alarm} alarm
   * @returns {Promise<void>}
   * @private
   */
  static async handleAuthStatusCheckAlarm(alarm) {
    if (alarm.name !== StartLoopAuthSessionCheckService.ALARM_NAME) {
      return;
    }

    const checkAuthService = new CheckAuthStatusService();
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

export default StartLoopAuthSessionCheckService;
