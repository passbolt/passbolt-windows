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
 * @since         0.0.2
 */
import GetOrganizationPolicyController from "passbolt-browser-extension/src/all/background_page/controller/accountRecovery/getOrganizationPolicyController";
import User from "passbolt-browser-extension/src/all/background_page/model/user";
import AccountRecoveryGetUserRequestsController from "passbolt-browser-extension/src/all/background_page/controller/accountRecovery/accountRecoveryGetUserRequestsController";
import AccountRecoveryGetRequestController from "passbolt-browser-extension/src/all/background_page/controller/accountRecovery/accountRecoveryGetRequestController";
import ReviewRequestController from "passbolt-browser-extension/src/all/background_page/controller/accountRecovery/reviewRequestController";
import AccountRecoveryValidateOrganizationPrivateKeyController from "passbolt-browser-extension/src/all/background_page/controller/accountRecovery/accountRecoveryValidateOrganizationPrivateKeyController";

// Account recovery has been build to avoid to load AppEvents and load events that we do not need into the desktop app
const listen = function(worker, account) {
  worker.port.on('passbolt.account-recovery.get-organization-policy', async requestId => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new GetOrganizationPolicyController(worker, requestId, apiClientOptions);
    await controller._exec();
  });

  worker.port.on('passbolt.account-recovery.get-user-requests', async(requestId, userId) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new AccountRecoveryGetUserRequestsController(worker, requestId, apiClientOptions);
    await controller._exec(userId);
  });

  worker.port.on('passbolt.account-recovery.get-request', async(requestId, accountRecoveryRequestId) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new AccountRecoveryGetRequestController(worker, requestId, apiClientOptions);
    await controller._exec(accountRecoveryRequestId);
  });

  worker.port.on('passbolt.account-recovery.review-request', async(requestId, accountRecoveryRequestId, responseStatus, privateKeyDto) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new ReviewRequestController(worker, requestId, apiClientOptions, account);
    await controller._exec(accountRecoveryRequestId, responseStatus, privateKeyDto);
  });

  worker.port.on('passbolt.account-recovery.validate-organization-private-key', async(requestId, accountRecoveryOrganizationPrivateKeyDto) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new AccountRecoveryValidateOrganizationPrivateKeyController(worker, requestId, apiClientOptions);
    return await controller._exec(accountRecoveryOrganizationPrivateKeyDto);
  });
};
export const AccountRecoveryEvents = {listen};
