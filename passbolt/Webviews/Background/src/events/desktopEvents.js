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

import AuthLogoutController from "../controllers/authLogoutController";
import DesktopSetAccountController from "../controllers/desktopSetAccountController";
import DesktopPassphraseStorageController from "../controllers/desktopPassphraseStorageController";
import DesktopRenderedIsReadyController from "../controllers/desktopRenderedIsReadyController";


const listen = function(worker, apiClientOptions, account) {
  /*
   * Logout.
   *
   * @listens passbolt.auth.logout
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.logout', async requestId => {
    const controller = new AuthLogoutController(worker, requestId, apiClientOptions);
    await controller._exec();
  });


  /*
   * Store the passphrase inside the config to remember it.
   *
   * @listens passbolt.background.store-passphrase
   * @param requestId {uuid} The request identifier
   * @param passphrase {object} the passphrase to store
   */
  worker.port.on('passbolt.background.store-passphrase', async(requestId, passphrase) => {
    const controller = new DesktopPassphraseStorageController(worker, requestId);
    await controller._exec(passphrase);
  });

  /*
   * Sign in the user which has imported an account kit
   *
   * @listens passbolt.account.get-current
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth-import.sign-in', async requestId => {
    const controller = new DesktopSetAccountController(worker, requestId, account);
    await controller._exec();
  });

  /*
   * Listen to rendered when the webview is up to refresh csrf token
   *
   * @listens passbolt.rendered.is-ready
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.rendered.is-ready', async requestId => {
    const controller = new DesktopRenderedIsReadyController(worker, requestId);
    await controller._exec();
  });
};

export const DesktopEvents = {listen};
