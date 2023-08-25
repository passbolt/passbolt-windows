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
 * @since         0.0.3
 */

import AuthModel from "passbolt-browser-extension/src/all/background_page/model/auth/authModel";
import {BACKGROUND_READY} from "../enumerations/appEventEnumeration";
import DesktopSetAccountController from "./desktopSetAccountController";
import IPCHandler from "../shared/IPCHandler";
import {enableFetchMocks} from "jest-fetch-mock";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import {accountKit} from "./desktopAuthenticateController.test.data";
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';
import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
import {v4 as uuidv4} from "uuid";


describe('DesktopSetAccountController', () => {
  let desktopSetAccountController;
  let worker;
  let requestId = uuidv4();

  beforeEach(async () => {
    enableFetchMocks();
    worker = { port: new IPCHandler() };
    jest.spyOn(AuthModel.prototype, 'logout').mockResolvedValue();
    desktopSetAccountController = new DesktopSetAccountController(worker, requestId, JSON.stringify(accountKit));
  });
  describe('DesktopSetAccountController', () => {
    describe('DesktopSetAccountController:_exec', () => {
      it('Should call exec function', async () => {
        expect.assertions(2);

        jest.spyOn(worker.port, 'emit');
        jest.spyOn(desktopSetAccountController, 'exec');

        await desktopSetAccountController._exec();

        expect(desktopSetAccountController.exec).toHaveBeenCalled();
        expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'SUCCESS');
      });


      it('Should post message with ERROR topic and error message if exec fails', async () => {
        expect.assertions(2);

        jest.spyOn(worker.port, 'emit');
        const error = new Error('Some error');
        jest.spyOn(desktopSetAccountController, 'exec').mockRejectedValue(error);
        await desktopSetAccountController._exec(worker);

        expect(desktopSetAccountController.exec).toHaveBeenCalled();
        expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'ERROR', error);
      });
    });
    describe('DesktopSetAccountController:exec', () => {
      it('Should init storage with the account kit', async () => {
        expect.assertions(2);
        jest.spyOn(LocalStorage, "init");
        localStorage.removeItem("_passbolt_data");

        await desktopSetAccountController.exec();
        const passboltData = JSON.parse(localStorage.getItem("_passbolt_data"))

        expect(passboltData.config['user.settings.trustedDomain']).toEqual(defaultAccountDto().domain)
        expect(LocalStorage.init).toHaveBeenCalled()
      })

      it('Should init config with the account kit', async () => {
        expect.assertions(1);
        jest.spyOn(Config, "init");

        await desktopSetAccountController.exec();

        expect(Config.init).toHaveBeenCalled()
      })

      it('Should send topic background ready to main process', async () => {
        expect.assertions(1);
        jest.spyOn(worker.port, 'emit');

        await desktopSetAccountController.exec();

        expect(worker.port.emit).toHaveBeenCalledWith(BACKGROUND_READY);
      })
    });
  })
})  