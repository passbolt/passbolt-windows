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

import AuthVerifyServerKeyController from "passbolt-browser-extension/src/all/background_page/controller/auth/authVerifyServerKeyController";
import DesktopAuthenticateController from "../controllers/desktopAuthenticateController";
import User from "passbolt-browser-extension/src/all/background_page/model/user";
import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import CheckPassphraseController from "passbolt-browser-extension/src/all/background_page/controller/crypto/checkPassphraseController";
import AuthLogoutController from "../controllers/authLogoutController";
import AuthVerifyServerKeyDesktopController from "../controllers/authVerifyServerKeyDesktopController";

const listen = function(worker) {
  /*
   * Authenticate with desktop application
   *
   * @listens passbolt.desktop.authenticate
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.login', async(requestId, passphrase) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions({requireCsrfToken: false});
    const controller = new DesktopAuthenticateController(worker, requestId, apiClientOptions);
    await controller._exec(passphrase);
  });

  /*
   * Verify the server identity.
   *
   * @listens passbolt.auth.verify
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.verify-server-key', async requestId => {
    const user = User.getInstance();
    const apiClientOptions = await user.getApiClientOptions({requireCsrfToken: false});
    const userDomain = user.settings.getDomain();
    const auth = new AuthVerifyServerKeyDesktopController(worker, requestId, apiClientOptions, userDomain);
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
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();
      const authModel = new AuthModel(clientOptions);
      const serverKeyDto = await authModel.getServerKey();
      worker.port.emit(requestId, 'SUCCESS', serverKeyDto);
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Replace the password server key for a given domain.
   *
   * @listens passbolt.auth.replace-server-key
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth.replace-server-key', async requestId => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const authModel = new AuthModel(apiClientOptions);
    const keyring = new Keyring();
    const domain = Config.read('user.settings.trustedDomain');

    try {
      const serverKeyDto = await authModel.getServerKey();
      await keyring.importServerPublicKey(serverKeyDto.armored_key, domain);
      worker.port.emit(requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
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
