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

import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import BuildApiClientOptionsService from "passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService";
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import {tempPassphrase} from "../data/mockStorage";
import {USER_LOGGED_IN, ERROR} from "../enumerations/appEventEnumeration";
import LoginUserService from "../services/loginUserService";
import { UserEvents } from "passbolt-browser-extension/src/all/background_page/event/userEvents";
import { RbacEvents } from "../events/rbacEvents";

/**
 * Controller related to the desktop authentication
 */
class DesktopAuthenticateController {

  /**
   * Wrapper of exec function to run.
   *
   * @return {Promise<void>}
   */
  async _exec(worker) {
    try {
      const config = await this.exec(worker);
      window.chrome.webview.postMessage(JSON.stringify({ topic: USER_LOGGED_IN, message: JSON.stringify(config) }));
    } catch (error) {
      window.chrome.webview.postMessage(JSON.stringify({ topic: ERROR, message: error }));
    }
  }

  /**
   * Attemps to sign in the current user.
   * 
   * @return {Promise<void>}
   */
  async exec(worker) {
    await Config.init();
    const result = await GetLegacyAccountService.get();
    const apiClientOptions = await BuildApiClientOptionsService.buildFromDomain(result.domain);
    const loginUserService = new LoginUserService(apiClientOptions);
    await loginUserService.checkPassphrase(tempPassphrase)
    await loginUserService.login(tempPassphrase, true)
    const account = await GetLegacyAccountService.get({role: true});
    RbacEvents.listen(worker, account);
    UserEvents.listen(worker, account)
    return loginUserService.getCurrentUser();
  }

}

export default DesktopAuthenticateController;
