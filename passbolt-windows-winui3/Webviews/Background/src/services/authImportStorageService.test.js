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

import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
import AuthImportEntity from "../entity/AuthImportEntity/authImportEntity";
import AuthImportStorageService from "./authImportStorageService";


describe('AuthImportStorageService', () => {
  const authImportEntity = new AuthImportEntity({account_kit: defaultAccountDto()});

  beforeEach(() => {
    AuthImportStorageService.flush();
  });

  describe('AuthImportStorageService:set', () => {
    it('should store the provided authImportEntity', () => {
      expect.assertions(1);

      AuthImportStorageService.set(authImportEntity);

      expect(AuthImportStorageService.get()).toEqual(authImportEntity);
    });
  });

  describe('AuthImportStorageService:get', () => {
    it('should return the stored authImportEntity', () => {
      expect.assertions(1);

      AuthImportStorageService.set(authImportEntity);

      const result = AuthImportStorageService.get();

      expect(result).toEqual(authImportEntity);
    });

    it('should return null if no authImportEntity is set', () => {
      expect.assertions(1);

      const result = AuthImportStorageService.get();

      expect(result).toBeNull();
    });
  });

  describe('AuthImportStorageService:flush', () => {
    it('should clear the stored authImportEntity', () => {
      expect.assertions(1);

      AuthImportStorageService.set(authImportEntity);
      AuthImportStorageService.flush();

      expect(AuthImportStorageService.get()).toBeNull();
    });
  });
});
