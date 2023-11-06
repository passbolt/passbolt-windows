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

import User from "passbolt-browser-extension/src/all/background_page/model/user";

/**
 * Controller related to the desktop rendered is ready
 */
class DesktopRenderedIsReadyController {
  /**
   * DesktopAuthenticateController constructor
   * @param {Worker} worker
   */
  constructor(worker, requestId, accountKit) {
    this.worker = worker;
    this.requestId = requestId;
    this.accountKit = accountKit;
  }

  /**
   * Wrapper of exec function to run.
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
   * Attemps to sign in the current user.
   * @return {Promise<void>}
   */
  async exec() {
    //Refresh csrf token 
    await User.getInstance().retrieveAndStoreCsrfToken();
  }
}

export default DesktopRenderedIsReadyController;
