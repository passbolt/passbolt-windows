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

import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import InitPassboltDataLocalStorageService from '../services/initPassboltDataLocalStorageService';
import {BACKGROUND_READY} from '../enumerations/appEventEnumeration';
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";

/**
 * Controller related to the desktop account
 */
class DesktopSetAccountController {
  /**
   * DesktopAuthenticateController constructor
   * @param {Worker} worker
   */
  constructor(worker, requestId, accountKit) {
    this.worker = worker;
    this.requestId = requestId;
    this.accountKit = accountKit;
  }

  /**
   * Wrapper of exec function to run.
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
   * Attemps to sign in the current user.
   * @return {Promise<void>}
   */
  async exec() {
    const kit = JSON.parse(this.accountKit);

    const accountDto = new AccountEntity({...kit.accountMetaData, ...kit.accountSecret});
    this.initPassboltDataLocalStorageService = new InitPassboltDataLocalStorageService();
    await this.initPassboltDataLocalStorageService.initPassboltData(accountDto);
    await Config.init();
    if(kit.accountMetaData?.theme) {
      Config.write('user.settings.theme', kit.accountMetaData.theme);
    }
    if(kit.accountMetaData?.locale) {
      Config.write('user.settings.locale', kit.accountMetaData.locale);
    }
    //Call the main process
    this.worker.port.emit(BACKGROUND_READY);
  }
}

export default DesktopSetAccountController;
