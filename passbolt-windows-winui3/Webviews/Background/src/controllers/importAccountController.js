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

import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import {SAVE_ACCOUNT} from "../enumerations/appEventEnumeration";
import AuthImportStorageService from "../services/authImportStorageService";

class ImportAccountController {
  /**
   * ImportAccountController constructor
   * @param {Worker} worker
   * @param {string} requestId uuid
   */
  constructor(worker, requestId) {
    this.worker = worker;
    this.requestId = requestId;
  }

  /**
   * Wrapper of exec function to run it with worker.
   * @return {Promise<void>}
   */
  async _exec() {
    try {
      await this.exec();
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Attemps to save the account kit into the credential locker.
   * @return {Promise<void>}
   */
  async exec() {
    const authImportAccount = AuthImportStorageService.get();
    const accountKit = authImportAccount.account_kit.toDto(AccountEntity.ALL_CONTAIN_OPTIONS);
    //We include the pending requestId to inform Rendered Webview when Auth background is UP and continue flow
    await this.worker.port.request(SAVE_ACCOUNT, {...accountKit, requestId: this.requestId});
  }
}

export default ImportAccountController;
