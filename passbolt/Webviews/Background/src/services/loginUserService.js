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

import UserAlreadyLoggedInError from "passbolt-browser-extension/src/all/background_page/error/userAlreadyLoggedInError";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import CheckAuthStatusService from "passbolt-browser-extension/src/all/background_page/service/auth/checkAuthStatusService";
import CheckPassphraseService from "passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService";
import AuthVerifyLoginChallengeService from "passbolt-browser-extension/src/all/background_page/service/auth/authVerifyLoginChallengeService";
import PassphraseStorageService from "passbolt-browser-extension/src/all/background_page/service/session_storage/passphraseStorageService";
import AuthenticationStatusService from "passbolt-browser-extension/src/all/background_page/service/authenticationStatusService";
import MfaAuthenticationRequiredError from "passbolt-browser-extension/src/all/background_page/error/mfaAuthenticationRequiredError";

/**
 * Service related to the login user service
 */
class LoginUserService {
  /**
   * constructor for the login user service
   * @param {AccountEntity} account The user account
   *
   */
  constructor(apiClientOptions, account) {
    this.account = account;
    this.checkPassphraseService = new CheckPassphraseService(new Keyring());
    this.authVerifyLoginChallengeService = new AuthVerifyLoginChallengeService(apiClientOptions);
    this.checkAuthStatusService = new CheckAuthStatusService();
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
   */
  async login(passphrase) {
    try {
      await this.authVerifyLoginChallengeService.verifyAndValidateLoginChallenge(this.account.userKeyFingerprint, this.account.userPrivateArmoredKey, passphrase);
      PassphraseStorageService.set(passphrase, -1);
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
      await AuthenticationStatusService.isAuthenticated();
    } catch (error) {
      if (!(error instanceof MfaAuthenticationRequiredError)) {
        throw error;
      }
      return error.details.mfa_providers[0];
    }
    return false;
  }
}

export default LoginUserService;
