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

import IPCHandler from "../shared/IPCHandler";
import {enableFetchMocks} from "jest-fetch-mock";
import {accountKit} from "./desktopAuthenticateController.test.data";
import {v4 as uuidv4} from "uuid";
import ImportAccountController from "./importAccountController";
import AuthImportStorageService from "../services/authImportStorageService";
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import { authImportDefault } from "./importAccountSignInController.test.data";
import { SAVE_ACCOUNT } from "../enumerations/appEventEnumeration";


describe('ImportAccountController', () => {
  let importAccountController;
  let worker;
  let accountDto;
  let requestId = uuidv4();
  let authImportEntity = authImportDefault();

  beforeEach(async () => {
    enableFetchMocks();
    worker = { port: new IPCHandler() };
    AuthImportStorageService.set(authImportEntity);
    accountDto = authImportEntity.account_kit.toDto(AccountEntity.ALL_CONTAIN_OPTIONS);
    importAccountController = new ImportAccountController(worker, requestId, JSON.stringify(accountKit));
  });
  describe('ImportAccountController', () => {
    describe('ImportAccountController:exec', () => {
      it('Should request the main process to save account kit into the credential locker', async () => {
        expect.assertions(1);

        jest.spyOn(worker.port,"request").mockImplementation(() => jest.fn());   
        await importAccountController.exec();

        expect(worker.port.request).toHaveBeenCalledWith(SAVE_ACCOUNT, {...accountDto, requestId});
      })
    });
  })
})  

