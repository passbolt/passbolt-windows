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
 * @since         0.5.0
 */

import AccountModel from "passbolt-browser-extension/src/all/background_page/model/account/accountModel";
import PassphraseStorageService from "passbolt-browser-extension/src/all/background_page/service/session_storage/passphraseStorageService";
import FileService from "passbolt-browser-extension/src/all/background_page/service/file/fileService";
import {DOWNLOAD_FILE, ROTATE_KEY} from "../enumerations/appEventEnumeration";
import KeepSessionAliveService from "passbolt-browser-extension/src/all/background_page/service/session_storage/keepSessionAliveService";

const RECOVERY_KIT_FILENAME = "passbolt-recovery-kit.asc";

class UpdatePrivateKeyController {
  /**
   * UpdatePrivateKeyController constructor
   * @param {Worker} worker
   * @param {string} requestId uuid
   */
  constructor(worker, requestId) {
    this.worker = worker;
    this.requestId = requestId;
    this.accountModel = new AccountModel();
  }

  /**
   * Wrapper of exec function to run it with worker.
   *
   * @return {Promise<void>}
   */
  async _exec(oldPassphrase, newPassphrase) {
    try {
      await this.exec(oldPassphrase, newPassphrase);
      this.worker.port.emit(this.requestId, "SUCCESS");
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Updates the passphrase of the current user's private key and then starts a download of the new key.
   * @param {string} oldPassphrase
   * @param {string} newPassphrase
   * @returns {Promise<void>}
   */
  async exec(oldPassphrase, newPassphrase) {
    if (typeof oldPassphrase !== 'string' || typeof newPassphrase !== 'string') {
      throw new Error('The old and new passphrase have to be string');
    }
    const userPrivateArmoredKey = await this.accountModel.rotatePrivateKeyPassphrase(oldPassphrase, newPassphrase);

    await this.accountModel.updatePrivateKey(userPrivateArmoredKey);
    await PassphraseStorageService.flushPassphrase();
    if (KeepSessionAliveService.isStarted()) {
      await PassphraseStorageService.set(newPassphrase);
    }

    this.worker.port.emit(ROTATE_KEY, userPrivateArmoredKey);
    const blobFile = new Blob([userPrivateArmoredKey], {type: "text/plain"});
    const content = await FileService.blobToDataURL(blobFile);
    const filename = RECOVERY_KIT_FILENAME;
    this.worker.port.emit(DOWNLOAD_FILE, {content, filename});
  }
}

export default UpdatePrivateKeyController;
