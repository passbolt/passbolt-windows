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

import VerifyAccountKitController from "../controllers/verifyAccountKitController";


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
  };
  
  export const AuthImportEvents = {listen};
  