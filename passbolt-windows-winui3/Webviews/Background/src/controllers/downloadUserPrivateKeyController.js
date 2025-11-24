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

import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import GetPassphraseService from "passbolt-browser-extension/src/all/background_page/service/passphrase/getPassphraseService";
import i18n from "passbolt-browser-extension/src/all/background_page/sdk/i18n";
import GpgKeyError from "passbolt-browser-extension/src/all/background_page/error/GpgKeyError";
import FileService from "passbolt-browser-extension/src/all/background_page/service/file/fileService";
import {DOWNLOAD_FILE} from "../enumerations/appEventEnumeration";

const PRIVATE_KEY_FILENAME = "passbolt_private.asc";
const MIME_TYPE_TEXT_PLAIN = "text/plain";

class DownloadUserPrivateKeyController {
  /**
   * DownloadUserPrivateKeyController constructor
   * @param {Worker} worker
   * @param {string} requestId uuid
   * @param {AccountEntity} account the account associated to the worker
   */
  constructor(worker, requestId, account) {
    this.worker = worker;
    this.requestId = requestId;
    this.keyring = new Keyring();
    this.getPassphraseService = new GetPassphraseService(account);
  }

  /**
   * Wrapper of exec function to run it with worker.
   *
   * @returns {Promise<void>}
   */
  async _exec() {
    try {
      await this.exec();
      this.worker.port.emit(this.requestId, "SUCCESS");
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Offer to users to download their private key
   *
   * @returns {Promise<void>}
   */
  async exec() {
    await this.getPassphraseService.requestPassphrase(this.worker);
    let privateKey;
    try {
      privateKey = this.keyring.findPrivate().armoredKey;
    } catch (e) {
      throw new GpgKeyError(i18n.t("Private key not found."));
    }

    const blobFile = new Blob([privateKey], {type: MIME_TYPE_TEXT_PLAIN});
    const content = await FileService.blobToDataURL(blobFile);
    //Fix Unexpected mix of shorthand and non-shorthand properties
    const filename = PRIVATE_KEY_FILENAME;

    this.worker.port.emit(DOWNLOAD_FILE, {content, filename});
  }
}

export default DownloadUserPrivateKeyController;
