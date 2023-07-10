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
import { Config } from "passbolt-browser-extension/src/all/background_page/model/config";
import { ERROR, USER_LOGGED_IN } from "../enumerations/appEventEnumeration";
import DesktopAuthenticateController from "./desktopAuthenticateController";
import StorageService from "../services/storageService";
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import { legacyResult, passboltData, userConfig } from "./desktopAuthenticateController.test.data";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import ExternalGpgKeyEntity from "passbolt-browser-extension/src/all/background_page/model/entity/gpgkey/external/externalGpgKeyEntity";
import { accountDto, tempPassphrase } from "../data/mockStorage";
import {enableFetchMocks} from "jest-fetch-mock";
import {mockApiResponse} from "passbolt-browser-extension/test/mocks/mockApiResponse";
import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import BuildApiClientOptionsService from "passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService";
import LoginUserService from "../services/loginUserService";
import IPCHandler from "../shared/IPCHandler";
import { UserEvents } from "passbolt-browser-extension/src/all/background_page/event/userEvents";

describe('DesktopAuthenticateController', () => {
  let desktopAuthenticateController;
  let storageService;
  let worker;

  beforeEach(async () => {
    enableFetchMocks();
    worker = {port: new IPCHandler()};
    jest.spyOn(GetLegacyAccountService, "get").mockImplementation(() => legacyResult);    
    fetch.doMockIf(/users\/csrf-token.json/, () =>  mockApiResponse("csrf-token"))
    jest.spyOn(AuthModel.prototype, 'login').mockResolvedValue();
    const mockFindPrivate = jest.spyOn(Keyring.prototype, "findPrivate");

    mockFindPrivate.mockImplementation(() => new ExternalGpgKeyEntity({armored_key: accountDto.user_private_armored_key}));
    storageService = new StorageService();
    desktopAuthenticateController = new DesktopAuthenticateController();
    await storageService.initPassboltData();
  });
  describe('DesktopAuthenticateController', () => {
    describe('DesktopAuthenticateController:_exec', () => {
      it('should post message with USER_LOGGED_IN topic if exec succeeds and return config', async () => {
        expect.assertions(2);

        jest.spyOn(desktopAuthenticateController, 'exec').mockResolvedValue(userConfig);
        await desktopAuthenticateController._exec(worker);

        expect(desktopAuthenticateController.exec).toHaveBeenCalled();
        expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: USER_LOGGED_IN, message: JSON.stringify(userConfig) }));
      });
      

      it('should post message with ERROR topic and error message if exec fails', async () => {
        expect.assertions(2);

        const error = new Error('Some error');
        jest.spyOn(desktopAuthenticateController, 'exec').mockRejectedValue(error);
        await desktopAuthenticateController._exec(worker);

        expect(desktopAuthenticateController.exec).toHaveBeenCalled();
        expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: ERROR, message: error }));
      });
    });
    describe('DesktopAuthenticateController:exec', () => {
      it('should initiate configuration', async () => {
        expect.assertions(2);

        jest.spyOn(Config, "init")
        
        await desktopAuthenticateController.exec(worker);

        expect(Config.init).toHaveBeenCalled();
        expect(Config.readAll()).toEqual(passboltData)
      })

      it('should build apiclientoptions with GetLegacyAccountService', async () => {
        expect.assertions(1);
        jest.spyOn(BuildApiClientOptionsService, "buildFromDomain")

        await desktopAuthenticateController.exec(worker);

        expect(BuildApiClientOptionsService.buildFromDomain).toHaveBeenCalledWith(legacyResult.domain);
      })

      it('should check and validate the passphrase', async () => {        
        expect.assertions(1);
        jest.spyOn(LoginUserService.prototype, "checkPassphrase")

        await desktopAuthenticateController.exec(worker);

        expect(LoginUserService.prototype.checkPassphrase).toHaveBeenCalledWith(tempPassphrase);
      })

      it('should login and persist the passphrase', async () => {
        expect.assertions(1);
        jest.spyOn(LoginUserService.prototype, "login")

        await desktopAuthenticateController.exec(worker);
        
        expect(LoginUserService.prototype.login).toHaveBeenCalledWith(tempPassphrase, true);
      })
      
      it('should return passbolt data without sensible data inside', async () => {
        expect.assertions(1);

        const config = await desktopAuthenticateController.exec(worker);
        
        expect(config).toEqual(userConfig);
      })

      it('should listen to UserEvents when user is authenticated', async () => {
        expect.assertions(1);
        
        jest.spyOn(UserEvents, "listen");
        const config = await desktopAuthenticateController.exec(worker);
        
        expect(UserEvents.listen).toHaveBeenCalled();
      })
    });

  })
})  