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
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import {USER_LOGGED_IN} from "../enumerations/appEventEnumeration";
import DesktopAuthenticateController from "./desktopAuthenticateController";
import InitPassboltDataLocalStorageService from "../services/initPassboltDataLocalStorageService";
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import ExternalGpgKeyEntity from "passbolt-browser-extension/src/all/background_page/model/entity/gpgkey/external/externalGpgKeyEntity";
import {accountDto, tempPassphrase} from "../data/mockStorage";
import {enableFetchMocks} from "jest-fetch-mock";
import {mockApiResponse} from "passbolt-browser-extension/test/mocks/mockApiResponse";
import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import LoginUserService from "../services/loginUserService";
import IPCHandler from "../shared/IPCHandler";
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import {v4 as uuidv4} from "uuid";
import {defaultApiClientOptions} from "passbolt-browser-extension/src/all/background_page/service/api/apiClient/apiClientOptions.test.data";
import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
 

describe('DesktopAuthenticateController', () => {
  let desktopAuthenticateController;
  let worker;
  let requestId = uuidv4();

  beforeEach(async () => {
    enableFetchMocks();
    worker = {port: new IPCHandler()};
    jest.spyOn(GetLegacyAccountService, "get").mockImplementation(() => new AccountEntity(defaultAccountDto()));    
    fetch.doMockIf(/users\/csrf-token.json/, () =>  mockApiResponse("csrf-token"))
    jest.spyOn(AuthModel.prototype, 'login').mockResolvedValue();

    const mockFindPrivate = jest.spyOn(Keyring.prototype, "findPrivate");

    const initPassboltDataLocalStorageService = new InitPassboltDataLocalStorageService(); 
    await initPassboltDataLocalStorageService.initPassboltData(defaultAccountDto()); 

    mockFindPrivate.mockImplementation(() => new ExternalGpgKeyEntity({armored_key: accountDto.user_private_armored_key}));
    desktopAuthenticateController = new DesktopAuthenticateController(worker, requestId, defaultApiClientOptions());
  });
  describe('DesktopAuthenticateController', () => {
    describe('DesktopAuthenticateController:_exec', () => {
      it('Should post message with USER_LOGGED_IN topic if exec succeeds and return config', async () => {
        expect.assertions(2);

        jest.spyOn(worker.port, 'emit');
        jest.spyOn(desktopAuthenticateController, 'exec').mockResolvedValue(jest.fn());
        await desktopAuthenticateController._exec(worker);

        expect(desktopAuthenticateController.exec).toHaveBeenCalled();
        expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'SUCCESS');
      });
      

      it('Should post message with ERROR topic and error message if exec fails', async () => {
        expect.assertions(2);

        jest.spyOn(worker.port, 'emit');
        const error = new Error('Some error');
        jest.spyOn(desktopAuthenticateController, 'exec').mockRejectedValue(error);
        await desktopAuthenticateController._exec(worker);

        expect(desktopAuthenticateController.exec).toHaveBeenCalled();
        expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'ERROR', error);
      });
    });
    describe('DesktopAuthenticateController:exec', () => {
      it('Should initiate configuration', async () => {
        expect.assertions(1);

        jest.spyOn(Config, "init")
        
        await desktopAuthenticateController.exec(tempPassphrase);

        expect(Config.init).toHaveBeenCalled();
      })

      it('Should check and validate the passphrase', async () => {        
        expect.assertions(1);
        jest.spyOn(LoginUserService.prototype, "checkPassphrase")

        await desktopAuthenticateController.exec(tempPassphrase);

        expect(LoginUserService.prototype.checkPassphrase).toHaveBeenCalledWith(tempPassphrase);
      })

      it('Should login and persist the passphrase', async () => {
        expect.assertions(1);
        jest.spyOn(LoginUserService.prototype, "login")

        await desktopAuthenticateController.exec(tempPassphrase);
        
        expect(LoginUserService.prototype.login).toHaveBeenCalledWith(tempPassphrase, true);
      })

      it('Should send event to main process after sign-in', async () => {
        expect.assertions(1);

        jest.spyOn(worker.port, 'emit');

        await desktopAuthenticateController.exec(tempPassphrase);
        
        expect(worker.port.emit).toHaveBeenCalledWith(USER_LOGGED_IN, tempPassphrase);
      })
    });

  })
})  