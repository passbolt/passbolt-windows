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
 * @since         0.0.3
 */

import FindMeController from "passbolt-browser-extension/src/all/background_page/controller/rbac/findMeController";
import User from "passbolt-browser-extension/src/all/background_page/model/user";

const listen = function (worker, account) {
    worker.port.on('passbolt.rbacs.find-me', async(requestId, name) => {
        const apiClientOptions = await User.getInstance().getApiClientOptions();
        const controller = new FindMeController(worker, requestId, apiClientOptions, account);
        await controller._exec(name);
    });
}

export const RbacEvents = { listen };
