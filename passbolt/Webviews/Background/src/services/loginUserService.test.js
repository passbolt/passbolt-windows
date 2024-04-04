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
 * @since         0.0.2
 */

import LoginUserService from "./loginUserService";

jest.mock('passbolt-browser-extension/src/all/background_page/model/auth/authModel');
jest.mock('passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService');
jest.mock('passbolt-browser-extension/src/all/background_page/model/keyring');
jest.mock('passbolt-browser-extension/src/all/background_page/service/session_storage/passphraseStorageService');

describe("LoginUserService", () => {
  let service;

  beforeEach(() => {
    service = new LoginUserService({});
  });

  describe("checkPassphrase", () => {
    it("should throw an error if checkPassphrase is called without arguments", async() => {
      await expect(service.checkPassphrase()).rejects.toThrow("A passphrase is required.");
    });

    it("should throw an error if checkPassphrase is called with non-string argument", async() => {
      await expect(service.checkPassphrase(12345)).rejects.toThrow("The passphrase should be a string.");
    });

    it("should call CheckPassphraseService.checkPassphrase with correct arguments", async() => {
      await service.checkPassphrase("secret");
      expect(service.checkPassphraseService.checkPassphrase).toHaveBeenCalledWith("secret");
    });
  });

  describe("login", () => {
    it("should call AuthModel.login with correct arguments", async() => {
      await service.login("secret", true);
      expect(service.authModel.login).toHaveBeenCalledWith("secret", true);
    });

    it("should handle general error correctly", async() => {
      const error = new Error("General error");
      service.authModel.login.mockImplementationOnce(() => {
        throw error;
      });
      await expect(service.login("secret", true)).rejects.toThrow(error);
    });
  });
});
