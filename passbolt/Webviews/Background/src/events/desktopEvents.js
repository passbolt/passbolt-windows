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
 * @since         0.0.3
 */

import AuthLogoutController from "../controllers/authLogoutController";
import User from "passbolt-browser-extension/src/all/background_page/model/user";
import DesktopSetAccountController from "../controllers/desktopSetAccountController";


const listen = function(worker) {
  /*
   * Logout.
   *
   * @listens passbolt.auth.logout
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.logout', async(requestId) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new AuthLogoutController(worker, requestId, apiClientOptions);
    await controller._exec();
  });
  /*
   * Retrieve current user for authentication screen.
   *
   * @listens passbolt.account.get-current
   * @param requestId {uuid} The request identifier
   * @param account {object} The account from credential locker
   */
  worker.port.on('passbolt.account.set-current', async(requestId, account) => {
    const controller = new DesktopSetAccountController(worker, requestId, account);
    await controller._exec();
  });
};

export const DesktopEvents = {listen};
