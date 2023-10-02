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

import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import {USER_LOGGED_OUT} from "../enumerations/appEventEnumeration";

class AuthLogoutController {
  /**
   * AuthLogoutController constructor
   * @param {Worker} worker
   * @param {string} requestId uuid
   * @param {ApiClientOptions} apiClientOptions the api client options
   */
  constructor(worker, requestId, apiClientOptions) {
    this.worker = worker;
    this.requestId = requestId;
    this.apiClientOptions = apiClientOptions;
    this.authModel = new AuthModel(this.apiClientOptions);
  }

  /**
   * Wrapper of exec function to run it with worker.
   * @return {Promise<void>}
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
   * Attemps to sign out the current user.
   * @return {Promise<void>}
   */
  async exec() {
    await this.authModel.logout();
    // emits a USER_LOGGED_OUT message for the UWP's Main process to handle specific process
    this.worker.port.emit(USER_LOGGED_OUT);
  }
}

export default AuthLogoutController;
