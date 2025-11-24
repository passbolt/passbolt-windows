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
 * @since         2.3.0
 */

import CopyToClipboardController from "passbolt-browser-extension/src/all/background_page/controller/clipboard/copyToClipboardController";
import CopyTemporarilyToClipboardController from "passbolt-browser-extension/src/all/background_page/controller/clipboard/copyTemporarilyToClipboardController";

const listen = function(worker) {
  /**
   * Copies the given content into the clipboard and clear any clipboard flush alarms.
   *
   * @listens assbolt.clipboard.copy
   * @param {string} requestId The request identifier
   * @param {string} text the content to copy
   */
  worker.port.on('passbolt.clipboard.copy', async(requestId, text) => {
    const clipboardController = new CopyToClipboardController(worker, requestId);
    await clipboardController._exec(text);
  });

  /**
   * Copies temporarily the given content into the clipboard and set a clipboard flush alarm.
   *
   * @listens assbolt.clipboard.copy-temporarily
   * @param {string} requestId The request identifier
   * @param {string} text the content to copy
   */
  worker.port.on('passbolt.clipboard.copy-temporarily', async(requestId, text) => {
    const clipboardController = new CopyTemporarilyToClipboardController(worker, requestId);
    await clipboardController._exec(text);
  }); 
}

export const ClipboardEvents = {listen};
