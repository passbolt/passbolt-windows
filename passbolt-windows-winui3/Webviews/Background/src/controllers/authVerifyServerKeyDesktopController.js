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
 * @since         0.5.0
 */

import AuthVerifyServerKeyController from "passbolt-browser-extension/src/all/background_page/controller/auth/authVerifyServerKeyController";
import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";

class AuthVerifyServerKeyDesktopController {
  /**
   * AuthController Constructor
   *
   * @param {Worker} worker
   * @param {string} requestId
   * @param {ApiClientOptions} apiClientOptions
   * @param {string} userDomain
   */
  constructor(worker, requestId, apiClientOptions, userDomain) {
    this.worker = worker;
    this.requestId = requestId;
    this.authModel = new AuthModel(apiClientOptions);
    this.authVerifyServerKeyController = new AuthVerifyServerKeyController(worker, requestId, apiClientOptions, userDomain);
  }

  /**
   * Controller executor.
   * @returns {Promise<void>}
   */
  async _exec() {
    try {
      await this.exec();
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Perform a GPGAuth verify with bext controller
   *
   * @returns {Promise<void>}
   */
  async exec() {
    try {
      await this.authVerifyServerKeyController.exec();
    } catch (error) {
      if (error.message.includes("x-gpgauth-authenticated should be set to false during the verify stage")) {
        //Remove the session by logout
        await this.authModel.logout();
        //Retry
        await this.authVerifyServerKeyController.exec();
      } else {
        throw error;
      }
    }
  }
}

export default AuthVerifyServerKeyDesktopController;
