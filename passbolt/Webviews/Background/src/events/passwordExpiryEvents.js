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
 * @since         0.6.0
 */

import FindPasswordExpirySettingsController from "passbolt-browser-extension/src/all/background_page/controller/passwordExpiry/findPasswordExpirySettingsController";

const listen = function(worker, apiClientOptions, account) {
  worker.port.on('passbolt.password-expiry.get-or-find', async(requestId) => {
    const controller = new FindPasswordExpirySettingsController(worker, requestId, account, apiClientOptions);
    await controller._exec();
  });
};

export const PasswordExpiryEvents = {listen};
