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

import User from "passbolt-browser-extension/src/all/background_page/model/user";
import FindUserPassphrasePoliciesController from "passbolt-browser-extension/src/all/background_page/controller/userPassphrasePolicies/findUserPassphrasePoliciesController";
import SaveUserPassphrasePoliciesController from "passbolt-browser-extension/src/all/background_page/controller/userPassphrasePolicies/saveUserPassphrasePoliciesController";

const listen = function(worker) {
  worker.port.on('passbolt.user-passphrase-policies.find', async requestId => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new FindUserPassphrasePoliciesController(worker, requestId, apiClientOptions);
    await controller._exec();
  });

  worker.port.on('passbolt.user-passphrase-policies.save', async(requestId, userPassphrasePoliciesDto) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new SaveUserPassphrasePoliciesController(worker, requestId, apiClientOptions);
    await controller._exec(userPassphrasePoliciesDto);
  });
}

export const UserPassphrasePolicies = {listen};