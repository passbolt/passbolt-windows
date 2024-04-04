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

import MfaAuthenticationRequiredError from "passbolt-browser-extension/src/all/background_page/error/mfaAuthenticationRequiredError";
import UserAlreadyLoggedInError from "passbolt-browser-extension/src/all/background_page/error/userAlreadyLoggedInError";
import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import AuthService from "passbolt-browser-extension/src/all/background_page/service/auth";
import CheckPassphraseService from "passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService";

/**
 * Service related to the login user service
 */
class LoginUserService {
  /**
   * constructor for the login user service
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    this.authModel = new AuthModel(apiClientOptions);
    this.checkPassphraseService = new CheckPassphraseService(new Keyring());
  }

  /**
   * check passphrase validity
   * @param {string} passphrase
   */
  async checkPassphrase(passphrase) {
    if (typeof passphrase === "undefined") {
      throw new Error("A passphrase is required.");
    }
    if (typeof passphrase !== "string") {
      throw new Error("The passphrase should be a string.");
    }
    if (typeof rememberMe !== "undefined" && typeof rememberMe !== "boolean") {
      throw new Error("The rememberMe should be a boolean.");
    }
    await this.checkPassphraseService.checkPassphrase(passphrase);
  }

  /**
   * sign in the user with backend
   * @param {string} passphrase
   * @param {boolean} rememberMe
   */
  async login(passphrase, rememberMe) {
    try {
      await this.authModel.login(passphrase, rememberMe);
    } catch (error) {
      if (!(error instanceof UserAlreadyLoggedInError)) {
        throw error;
      }
    }
  }

  /**
   * check if mfa is required
   * @returns {Promise<void>}
   */
  async isMfaRequired() {
    try {
      await AuthService.isAuthenticated();
    } catch (error) {
      if (error instanceof MfaAuthenticationRequiredError) {
        return error.details.mfa_providers[0];
      } else {
        throw error;
      }
    }
  }
}

export default LoginUserService;
