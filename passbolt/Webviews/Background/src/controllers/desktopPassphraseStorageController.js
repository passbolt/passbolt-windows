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

import PassphraseStorageService from "passbolt-browser-extension/src/all/background_page/service/session_storage/passphraseStorageService";

class DesktopPassphraseStorageController {
    /**
     * DesktopPassphraseStorageController constructor
     * @param {Worker} worker
     * @param {string} requestId uuid
     */
    constructor(worker, requestId) {
      this.worker = worker;
      this.requestId = requestId;
    }
  
    /**
     * Wrapper of exec function to run it with worker.
     * @param {string} passphrase 
     * @return {Promise<void>}
     */
    async _exec(passphrase) {
      try {
        await this.exec(passphrase);
        this.worker.port.emit(this.requestId, 'SUCCESS');
      } catch (error) {
        console.error(error);
        this.worker.port.emit(this.requestId, 'ERROR', error);
      }
    }
  
    /**
     * Attemps to sign out the current user.
     * @param {string} passphrase 
     * @return {Promise<void>}
     */
    async exec(passphrase) {
      if (typeof passphrase !== "string") {
        throw new TypeError("The passphrase should be a string.");
      }
      await PassphraseStorageService.set(passphrase, -1);
    }
  }
  
  export default DesktopPassphraseStorageController;