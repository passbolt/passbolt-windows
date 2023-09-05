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
import {v4 as uuidv4} from "uuid";
import AuthImportStorageService from "../services/authImportStorageService";
import ImportAccountSignInController from "./importAccountSignInController";
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import {enableFetchMocks} from "jest-fetch-mock";
import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import {mockApiResponse} from "passbolt-browser-extension/test/mocks/mockApiResponse";
import {authImportDefault, passboltDataConfig} from "./importAccountSignInController.test.data";
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import LoginUserService from "../services/loginUserService";
import { USER_LOGGED_IN } from "../enumerations/appEventEnumeration";

describe('ImportAccountSignInController', () => {
    let importAccountSignInController;
    let worker;
    let accountDto;
    let authImportEntity = authImportDefault();
    let requestId = uuidv4();

    beforeEach(async () => {
        enableFetchMocks();
        worker = { port: new IPCHandler() };
        // Init the storage
        AuthImportStorageService.set(authImportEntity);
        accountDto = authImportEntity.account_kit.toDto(AccountEntity.ALL_CONTAIN_OPTIONS)
        // Mock API Calls
        jest.spyOn(GetLegacyAccountService, "get").mockImplementation(() => accountDto);    
        fetch.doMockIf(/users\/csrf-token.json/, () =>  mockApiResponse("csrf-token"))
        jest.spyOn(AuthModel.prototype, 'login').mockResolvedValue();

        importAccountSignInController = new ImportAccountSignInController(worker, requestId);
    });
    describe('ImportAccountSignInController:exec', () => {
        it('Should initialise _passbolt_data with imported account kit', async () => {
            expect.assertions(2);
            jest.spyOn(LocalStorage, "init");

            await importAccountSignInController.exec();
            const storage = JSON.parse(localStorage.getItem("_passbolt_data"))

            expect(storage.config).toEqual(passboltDataConfig({"user.id": accountDto.user_id}));
            expect(LocalStorage.init).toHaveBeenCalled()
        })
        it('Should check the passphrase from the user', async () => {
            expect.assertions(1);
            jest.spyOn(LoginUserService.prototype, "checkPassphrase")

            await importAccountSignInController.exec();

            expect(LoginUserService.prototype.checkPassphrase).toHaveBeenCalledWith(authImportEntity.passphrase);
        })
        it('Should authenticate user with the imported account kit and passphrase', async () => {
            expect.assertions(1);
            jest.spyOn(LoginUserService.prototype, "login")

            await importAccountSignInController.exec();

            expect(LoginUserService.prototype.login).toHaveBeenCalledWith(authImportEntity.passphrase, true);
        })

        it('Should send event to main process after sign-in', async () => {
            expect.assertions(1);
    
            jest.spyOn(worker.port, 'emit');
    
            await importAccountSignInController.exec();
            
            expect(worker.port.emit).toHaveBeenCalledWith(USER_LOGGED_IN);
          })
    });
})
