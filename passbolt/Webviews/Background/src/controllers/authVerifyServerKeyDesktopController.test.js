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

import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';
import AuthVerifyServerKeyDesktopController from "./authVerifyServerKeyDesktopController";

describe('AuthVerifyServerKeyDesktopController.test', () => {
  let authVerifyServerKeyDesktopController;

  beforeEach(() => {
    const worker = {
      port: {
        emit: jest.fn()
      }
    };
    const account = {id: "d57c10f5-639d-5160-9c81-8a0c6c4ec856", domain: "https://passbolt.com"};
    authVerifyServerKeyDesktopController = new AuthVerifyServerKeyDesktopController(worker, null, defaultApiClientOptions(), "https://passbolt.com", account);
  });

  describe('ExportResourcesFileDesktopController:exec', () => {
    it('Should call authVerifyServerKeyController from bext', async() => {
      jest.spyOn(authVerifyServerKeyDesktopController.authVerifyServerKeyController, "exec").mockImplementation(() => Promise.resolve());
      await authVerifyServerKeyDesktopController.exec();

      expect(authVerifyServerKeyDesktopController.authVerifyServerKeyController.exec).toHaveBeenCalled();
    });

    it('Should logout the user and retry', async() => {
      let call = 0;
      jest.spyOn(authVerifyServerKeyDesktopController.authVerifyServerKeyController, "exec").mockImplementation(() => {
        if (call++ === 0) {
          throw new Error('x-gpgauth-authenticated should be set to false during the verify stage');
        }
        return Promise.resolve();
      });
      jest.spyOn(authVerifyServerKeyDesktopController.authModel, "logout").mockImplementation(() => Promise.resolve());

      await authVerifyServerKeyDesktopController.exec();

      expect(authVerifyServerKeyDesktopController.authVerifyServerKeyController.exec).toHaveBeenCalledTimes(2);
      expect(authVerifyServerKeyDesktopController.authModel.logout).toHaveBeenCalledTimes(1);
    });
  });
});
