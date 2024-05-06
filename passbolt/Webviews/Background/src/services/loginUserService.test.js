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
import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';
import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
import AuthenticationStatusService from "passbolt-browser-extension/src/all/background_page/service/authenticationStatusService";
import MfaAuthenticationRequiredError from "passbolt-browser-extension/src/all/background_page/error/mfaAuthenticationRequiredError";

jest.mock('passbolt-browser-extension/src/all/background_page/service/auth/authVerifyLoginChallengeService');
jest.mock('passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService');
jest.mock('passbolt-browser-extension/src/all/background_page/model/keyring');
jest.mock('passbolt-browser-extension/src/all/background_page/service/session_storage/passphraseStorageService');
jest.mock('passbolt-browser-extension/src/all/background_page/service/authenticationStatusService');

describe("LoginUserService", () => {
  let service, account;

  beforeEach(() => {
    const apiClientOptions = defaultApiClientOptions();
    account = defaultAccountDto();
    service = new LoginUserService(apiClientOptions, account);
  });

  describe("checkPassphrase", () => {
    it("should throw an error if checkPassphrase is called without arguments", async() => {
      expect.assertions(1);

      await expect(service.checkPassphrase()).rejects.toThrow("A passphrase is required.");
    });

    it("should throw an error if checkPassphrase is called with non-string argument", async() => {
      expect.assertions(1);

      await expect(service.checkPassphrase(12345)).rejects.toThrow("The passphrase should be a string.");
    });

    it("should call CheckPassphraseService.checkPassphrase with correct arguments", async() => {
      expect.assertions(1);

      await service.checkPassphrase("secret");

      expect(service.checkPassphraseService.checkPassphrase).toHaveBeenCalledWith("secret");
    });
  });

  describe("login", () => {
    it("should call authVerifyLoginChallengeService.verifyAndValidateLoginChallenge with correct arguments", async() => {
      expect.assertions(1);

      await service.login("secret", true);

      expect(service.authVerifyLoginChallengeService.verifyAndValidateLoginChallenge).toHaveBeenCalledWith(account.userKeyFingerprint, account.userPrivateArmoredKey, "secret");
    });

    it("should handle general error correctly", async() => {
      expect.assertions(1);

      const error = new Error("General error");
      service.authVerifyLoginChallengeService.verifyAndValidateLoginChallenge.mockImplementationOnce(() => {
        throw error;
      });
      await expect(service.login("secret", true)).rejects.toThrow(error);
    });
  });


  describe("isMfaRequired", () => {
    it("should call AuthenticationStatusService and return false when mfa is not required", async() => {
      expect.assertions(2);

      const result = await service.isMfaRequired();

      expect(AuthenticationStatusService.isAuthenticated).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it("should return the provider if mfa is required", async() => {
      expect.assertions(2);

      const provider = "totp";
      AuthenticationStatusService.isAuthenticated.mockImplementationOnce(() => {
        throw new MfaAuthenticationRequiredError("mfa-required", {mfa_providers: [provider]});
      });

      const result = await service.isMfaRequired();

      expect(AuthenticationStatusService.isAuthenticated).toHaveBeenCalled();
      expect(result).toEqual(provider);
    });
  });
});
