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
import VerifyAccountKitService from "../services/verifyAccountKitService";

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
        this.verifyAccountKitService = new VerifyAccountKitService();
    }

  /**
   * Wrapper of exec function to run.
   * @param {Object} encodedAccountKit
   * @return {Promise<void>}
   */
  async _exec(encodedAccountKit) {
    try {
      const accountKit = await this.exec(encodedAccountKit);
      this.worker.port.emit(this.requestId, 'SUCCESS', accountKit);
    } catch (error) {
      console.error(error)
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Attemps verify the uploaded account kit
   * @param {Object} encodedAccountKit the account kit to import
   * @return {Promise<void>}
   */
  async exec(encodedAccountKit) { 
    const accountKit = await this.verifyAccountKitService.verify(encodedAccountKit);
    const authAccountEntity = new AuthImportEntity({account_kit: accountKit})
    AuthImportStorageService.set(authAccountEntity)
    return accountKit;
  }
}

export default VerifyAccountKitController;