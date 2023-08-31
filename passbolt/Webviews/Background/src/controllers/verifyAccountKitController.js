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

import Validator from "validator";
import AuthImportStorageService from "../services/authImportStorageService";
import AuthImportEntity from "../entity/AuthImportEntity/authImportEntity";
import {Buffer} from 'buffer';

/**
 * Controller related to the verify account kit.
 */
class VerifyAccountKitController { 

   /**
   * VerifyAccountKitController constructor.
   * @param {Worker} worker
   * @param {Object} accountKit
   */
    constructor(worker, requestId) {
        this.worker = worker;
        this.requestId = requestId;
    }

  /**
   * Wrapper of exec function to run.
   * @param {Object} encodedAccountKit
   * @return {Promise<void>}
   */
  async _exec(encodedAccountKit) {
    try {
      await this.exec(encodedAccountKit);
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error.details)
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Attemps verify the uploaded account kit
   * @param {Object} encodedAccountKit the account kit to import
   * @return {Promise<void>}
   */
  async exec(encodedAccountKit) { 
    if (!encodedAccountKit) {
        throw new Error("The account kit is required.");
    }
    if (typeof encodedAccountKit !== 'string') {
      throw new TypeError("The account kit should be a string.");
  }
    if (!Validator.isBase64(encodedAccountKit)) {
        throw new TypeError("The account kit should be a base 64 format.");
    }
    
    const accountKitStringify = Buffer.from(encodedAccountKit, "base64").toString();
    const accountKit = JSON.parse(accountKitStringify)
    const authAccountEntity = new AuthImportEntity({account_kit: accountKit})
    AuthImportStorageService.set(authAccountEntity)
  }
}

export default VerifyAccountKitController;