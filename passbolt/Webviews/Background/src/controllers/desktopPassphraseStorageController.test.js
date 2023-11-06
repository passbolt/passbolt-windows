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
import DesktopPassphraseStorageController from "./desktopPassphraseStorageController";
import PassphraseStorageService from "passbolt-browser-extension/src/all/background_page/service/session_storage/passphraseStorageService";

describe('DesktopPassphraseStorageController', () => {
  let desktopPassphraseStorageController, worker;
  const requestId = uuidv4();

  beforeEach(async() => {
    worker = {port: new IPCHandler()};
    desktopPassphraseStorageController = new DesktopPassphraseStorageController(worker, requestId);
  });

  describe('DesktopPassphraseStorageController:exec', () => {
    it('Should save the passphrase in memory', async() => {
      expect.assertions(1);

      jest.spyOn(PassphraseStorageService, "set");
      const passphrase = "ada@passbolt.com";
      await desktopPassphraseStorageController.exec(passphrase);

      expect(PassphraseStorageService.set).toHaveBeenCalledWith(passphrase, -1);
    });

    it("should throw an error if checkPassphrase is called with non-string argument", async() => {
      await expect(desktopPassphraseStorageController.exec(12345)).rejects.toThrow("The passphrase should be a string.");
    });
  });
});
