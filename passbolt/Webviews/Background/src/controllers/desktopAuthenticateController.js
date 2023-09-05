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
import {USER_LOGGED_IN} from "../enumerations/appEventEnumeration";
import LoginUserService from "../services/loginUserService";

/**
 * Controller related to the desktop authentication
 */
class DesktopAuthenticateController {

    /**
   * DesktopAuthenticateController constructor
   * @param {Worker} worker
   */
    constructor(worker, requestId, apiClientOptions) {
      this.worker = worker;
      this.requestId = requestId;
      this.apiClientOptions = apiClientOptions;
    }
  

  /**
   * Wrapper of exec function to run.
   *
   * @return {Promise<void>}
   */
  async _exec(passphrase) {
    try {
      await this.exec(passphrase);
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error)
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Attemps to sign in the current user.
   * @param {string} passphrase the user passphrase
   * @return {Promise<void>}
   */
  async exec(passphrase) {
    if (typeof passphrase !== "string") {
      throw new TypeError("The passphrase should be a string.");
    }
    //Need to reinit configuration as we launch a new application
    await Config.init();
    const loginUserService = new LoginUserService(this.apiClientOptions);
    await loginUserService.checkPassphrase(passphrase)
    await loginUserService.login(passphrase, true)
    //Send message to the UWP's main process to handle specific 'log in' process
    this.worker.port.emit(USER_LOGGED_IN);
  }

}

export default DesktopAuthenticateController;
