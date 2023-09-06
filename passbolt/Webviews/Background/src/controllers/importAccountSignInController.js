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
import {USER_LOGGED_IN} from "../enumerations/appEventEnumeration";
import AuthImportStorageService from "../services/authImportStorageService";
import InitPassboltDataLocalStorageService from "../services/initPassboltDataLocalStorageService";
import LoginUserService from "../services/loginUserService";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import User from "passbolt-browser-extension/src/all/background_page/model/user";

class ImportAccountSignInController {
    /**
     * ImportAccountSignInController constructor
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
     * Attemps to sign in imported account.
     * @return {Promise<void>}
     */
    async exec() {
      const {account_kit, passphrase} = AuthImportStorageService.get();
      const accountKit = account_kit.toDto(AccountEntity.ALL_CONTAIN_OPTIONS);
      //Init passbolt data storage
      const accountEntity = new AccountEntity(accountKit);
      const initPassboltDataLocalStorageService = new InitPassboltDataLocalStorageService();
      await initPassboltDataLocalStorageService.initPassboltData(accountEntity);
      await Config.init();
      //Sign in to server
      const apiClientOptions = await User.getInstance().getApiClientOptions();
      const loginUserService = new LoginUserService(apiClientOptions);
      await loginUserService.checkPassphrase(passphrase)
      await loginUserService.login(passphrase, true)
      //Send message to the UWP's main process to handle specific 'log in' process
      this.worker.port.emit(USER_LOGGED_IN, passphrase);
      AuthImportStorageService.flush();
    }
  }
  
  export default ImportAccountSignInController;
  