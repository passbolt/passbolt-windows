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
 * @since         0.3.0
 */

import AuthImportStorageService from "../services/authImportStorageService";
import CheckPassphraseService from "passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService";

/**
 * Controller related to the verify passphrase.
 */
class VerifyPassphraseController {
  /**
   * verifyPassphraseController constructor.
   * @param {Worker} worker
   * @param {Object} accountKit
   */
  constructor(worker, requestId) {
    this.worker = worker;
    this.requestId = requestId;
  }

  /**
   * Wrapper of exec function to run.
   * @param {string} passphrase
   * @return {Promise<void>}
   */
  async _exec(passphrase) {
    try {
      await this.exec(passphrase);
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Attemps verify the uploaded account kit passphrase
   * @param {string} passphrase to verify
   * @return {Promise<void>}
   */
  async exec(passphrase) {
    if (!passphrase) {
      throw new Error("The passphrase is required.");
    }
    if (typeof passphrase !== "string") {
      throw new TypeError("The passphrase should be a string.");
    }

    const checkPassphraseService = new CheckPassphraseService(AuthImportStorageService);
    await checkPassphraseService.checkPassphrase(passphrase);
    const authAccountEntity = AuthImportStorageService.get();
    authAccountEntity.passphrase = passphrase;
    AuthImportStorageService.set(authAccountEntity);
  }
}

export default VerifyPassphraseController;
