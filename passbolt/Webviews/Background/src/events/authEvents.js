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

import DesktopAuthenticateController from "../controllers/desktopAuthenticateController";
import CheckPassphraseController from "passbolt-browser-extension/src/all/background_page/controller/crypto/checkPassphraseController";
import AuthVerifyServerKeyController from "passbolt-browser-extension/src/all/background_page/controller/auth/authVerifyServerKeyController";
import GetServerKeyController from "passbolt-browser-extension/src/all/background_page/controller/auth/getServerKeyController";
import ReplaceServerKeyController from "passbolt-browser-extension/src/all/background_page/controller/auth/replaceServerKeyController";

const listen = function(worker, apiClientOptions, account) {
  /*
   * Authenticate with desktop application
   *
   * @listens passbolt.desktop.authenticate
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.login', async(requestId, passphrase) => {
    const controller = new DesktopAuthenticateController(worker, requestId, apiClientOptions, account);
    await controller._exec(passphrase);
  });

  /*
   *GetServerKeyController
   * Verify the server identity.
   *
   * @listens passbolt.auth.verify
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.verify-server-key', async requestId => {
    const auth = new AuthVerifyServerKeyController(worker, requestId, apiClientOptions, account);
    await auth._exec();
  });

  /*
   * Get the password server key for a given domain.
   *
   * @listens passbolt.auth.get-server-key
   * @param requestId {uuid} The request identifier
   * @param domain {string} The server's domain
   */
  worker.port.on('passbolt.auth.get-server-key', async requestId => {
    const getServerKeyController = new GetServerKeyController(worker, requestId, apiClientOptions);
    await getServerKeyController._exec();
  });

  /*
   * Replace the password server key for a given domain.
   *
   * @listens passbolt.auth.replace-server-key
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.replace-server-key', async requestId => {
    const replaceServerKeyController = new ReplaceServerKeyController(worker, requestId, apiClientOptions, account);
    await replaceServerKeyController._exec();
  });


  /*
   * Verify the passphrase
   *
   * @listens passbolt.auth.verify-passphrase
   * @param requestId {uuid} The request identifier
   * @param passphrase {string} The passphrase to verify
   */
  worker.port.on('passbolt.auth.verify-passphrase', async(requestId, passphrase) => {
    const controller = new CheckPassphraseController(worker, requestId);
    await controller._exec(passphrase);
  });

  /*
   * Redirect the user post login.
   *
   * @listens passbolt.auth.post-login-redirect
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.post-login-redirect', requestId => {
    worker.port.emit(requestId, 'SUCCESS');
  });
};

export const AuthEvents = {listen};
