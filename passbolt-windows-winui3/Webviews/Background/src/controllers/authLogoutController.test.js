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
import {USER_LOGGED_OUT} from "../enumerations/appEventEnumeration";
import {enableFetchMocks} from "jest-fetch-mock";
import IPCHandler from "../shared/IPCHandler";
import AuthLogoutController from "./authLogoutController";
import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';
import AuthLogoutService from "passbolt-styleguide/src/shared/services/api/auth/AuthLogoutService";

describe('AuthLogoutController', () => {
  let authLogoutController, worker;

  beforeEach(async() => {
    enableFetchMocks();
    worker = {port: new IPCHandler()};
    jest.spyOn(AuthLogoutService.prototype, 'logout').mockResolvedValue();
    authLogoutController = new AuthLogoutController(worker, "request-id", defaultApiClientOptions());
  });
  describe('AuthLogoutController', () => {
    describe('AuthLogoutController:exec', () => {
      it('Should call logout from AuthLogoutService', async() => {
        expect.assertions(1);

        jest.spyOn(authLogoutController.authLogoutService, "logout");

        await authLogoutController.exec();

        expect(authLogoutController.authLogoutService.logout).toHaveBeenCalled();
      });

      it('Should post message with USER_LOGGED_OUT topic if logout succeed', async() => {
        expect.assertions(1);

        jest.spyOn(worker.port, 'emit');
        await authLogoutController._exec(worker);

        expect(worker.port.emit).toHaveBeenCalledWith(USER_LOGGED_OUT);
      });
    });
  });
});
