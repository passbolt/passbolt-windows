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
import {BACKGROUND_AUTHENTICATION_ERROR, REQUIRE_MFA, USER_LOGGED_IN} from "../enumerations/appEventEnumeration";
import LoginUserService from "../services/loginUserService";
import FindSiteSettingsService from "passbolt-browser-extension/src/all/background_page/service/siteSettings/findSiteSettingsService";

// The passkeys MFA provider cannot be used within the desktop application (WebAuthn is not available in the UWP AppContainer)
const WEBAUTHN_PROVIDER = "webauthn";

/**
 * Controller related to the desktop authentication
 */
class DesktopAuthenticateController {
  /**
   * DesktopAuthenticateController constructor
   * @param {Worker} worker
   * @param {Uuid} requestId
   * @param {ApiClientOptions} clientOptions
   * @param {AccountEntity} account
   */
  constructor(worker, requestId, apiClientOptions, account) {
    this.worker = worker;
    this.requestId = requestId;
    this.apiClientOptions = apiClientOptions;
    this.account = account;
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
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
      this.worker.port.emit(BACKGROUND_AUTHENTICATION_ERROR);
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
    const loginUserService = new LoginUserService(this.apiClientOptions, this.account);
    await loginUserService.checkPassphrase(passphrase);
    //Used to retrieve the crsf token to the API, it allows to be sure to load it to each case
    const findSiteSettingsService = new FindSiteSettingsService(this.apiClientOptions);
    await findSiteSettingsService.findSiteSettings();
    await loginUserService.login(passphrase);
    const provider = await loginUserService.isMfaRequired();
    if (provider === WEBAUTHN_PROVIDER) {
      //The API lists webauthn last, it is only returned first when it is the only provider enabled for the user
      throw new Error("Passkeys are not supported by the desktop application. Please enable another multi-factor authentication provider from the browser extension.");
    } else if (provider) {
      //Send message to the UWP's main process to handle specific 'require mfa' process
      this.worker.port.emit(REQUIRE_MFA, {provider, passphrase});
    } else {
      //Send message to the UWP's main process to handle specific 'log in' process
      this.worker.port.emit(USER_LOGGED_IN, passphrase);
    }
  }
}

export default DesktopAuthenticateController;
