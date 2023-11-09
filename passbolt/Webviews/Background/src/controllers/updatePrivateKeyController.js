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
import OrganizationSettingsModel from "passbolt-browser-extension/src/all/background_page/model/organizationSettings/organizationSettingsModel";
import SsoDataStorage from "passbolt-browser-extension/src/all/background_page/service/indexedDB_storage/ssoDataStorage";
import SsoKitServerPartModel from "passbolt-browser-extension/src/all/background_page/model/sso/ssoKitServerPartModel";
import PassboltApiFetchError from "passbolt-browser-extension/src/all/background_page/error/passboltApiFetchError";
import GenerateSsoKitService from "passbolt-browser-extension/src/all/background_page/service/sso/generateSsoKitService";
import {DOWNLOAD_FILE} from "../enumerations/appEventEnumeration";

const RECOVERY_KIT_FILENAME = "passbolt-recovery-kit.asc";

class UpdatePrivateKeyController {
  /**
   * UpdatePrivateKeyController constructor
   * @param {Worker} worker
   * @param {string} requestId uuid
   * @param {ApiClientOptions} apiClientOptions the api client options
   */
  constructor(worker, requestId, apiClientOptions) {
    this.worker = worker;
    this.requestId = requestId;
    this.accountModel = new AccountModel(apiClientOptions);
    this.organisationSettingsModel = new OrganizationSettingsModel(apiClientOptions);
    this.ssoKitServerPartModel = new SsoKitServerPartModel(apiClientOptions);
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
   * It also generates a new SSO kit if required.
   * @param {string} oldPassphrase
   * @param {string} newPassphrase
   * @returns {Promise<void>}
   */
  async exec(oldPassphrase, newPassphrase) {
    if (typeof oldPassphrase !== 'string' || typeof newPassphrase !== 'string') {
      throw new Error('The old and new passphrase have to be string');
    }
    const organizationSettings = await this.organisationSettingsModel.getOrFind();
    const ssoIsEnabled = organizationSettings.isPluginEnabled("sso");

    const userPrivateArmoredKey = await this.accountModel.rotatePrivateKeyPassphrase(oldPassphrase, newPassphrase);
    if (ssoIsEnabled) {
      await this.regenerateSsoKit(newPassphrase);
    }
    await this.accountModel.updatePrivateKey(userPrivateArmoredKey);
    await PassphraseStorageService.flushPassphrase();
    if (PassphraseStorageService.isSessionKeptUntilLogOut()) {
      await PassphraseStorageService.set(newPassphrase);
    }

    const blobFile = new Blob([userPrivateArmoredKey], {type: "text/plain"});
    const content = await FileService.blobToDataURL(blobFile);
    this.worker.port.emit(DOWNLOAD_FILE, {content, filename: RECOVERY_KIT_FILENAME});
  }

  /**
   * Handles the generation of a new SSO kit.
   * @param {string} newPassphrase
   * @returns {Promise<void>}
   */
  async regenerateSsoKit(newPassphrase) {
    let currentKit;
    try {
      currentKit = await SsoDataStorage.get();
    } catch (e) {
      console.log(e);
      return;
    }

    if (!currentKit) {
      return;
    }

    if (currentKit.isRegistered()) {
      await this.deleteServerPartSsoKit(currentKit.id);
    }

    const ssoKits = await GenerateSsoKitService.generateSsoKits(newPassphrase, currentKit.provider);
    const registeredServerPartSsoKit = await this.ssoKitServerPartModel.setupSsoKit(ssoKits.serverPart);
    ssoKits.clientPart.id = registeredServerPartSsoKit.id;
    await SsoDataStorage.save(ssoKits.clientPart);
  }

  /**
   * Tries to delete the server part SSO kit id if any.
   * If the kit doesn't exist on the server, it ignores the deletion silently.
   * @param {uuid} ssoKitId
   * @private
   */
  async deleteServerPartSsoKit(ssoKitId) {
    try {
      await this.ssoKitServerPartModel.deleteSsoKit(ssoKitId);
    } catch (e) {
      // we assume that the kit might have been remove from the server already
      if (!(e instanceof PassboltApiFetchError && e?.data?.code === 404)) {
        throw e;
      }
    }
  }
}

export default UpdatePrivateKeyController;
