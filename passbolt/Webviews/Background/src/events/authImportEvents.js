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

import ImportAccountController from "../controllers/importAccountController";
import VerifyAccountKitController from "../controllers/verifyAccountKitController";
import VerifyPassphraseController from "../controllers/verifyPassphraseController";


const listen = function(worker) {
  /*
   * Verify imported account kit
   *
   * @listens passbolt.background.verify-account-kit
   * @param requestId {uuid} The request identifier
   * @param accountKit {object} The account to verify
   */
  worker.port.on('passbolt.background.verify-account-kit', async(requestId, accountKit) => {
    const exportController = new VerifyAccountKitController(worker, requestId);
    await exportController._exec(accountKit);
  });

  /*
   * Verify the passphrase for the account kit
   *
   * @listens passbolt.auth-import.verify-passphrase
   * @param requestId {uuid} The request identifier
   * @param passphrase {string} The passphrase to verify
   */
  worker.port.on('passbolt.auth-import.verify-passphrase', async(requestId, passphrase) => {
    const verifyPassphraseController = new VerifyPassphraseController(worker, requestId);
    await verifyPassphraseController._exec(passphrase);
  });

  /*
   * Save the imported account kit
   *
   * @listens passbolt.auth-import.import-account
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.auth-import.import-account', async requestId => {
    const importAccountController = new ImportAccountController(worker, requestId);
    await importAccountController._exec();
  });
};

export const AuthImportEvents = {listen};
