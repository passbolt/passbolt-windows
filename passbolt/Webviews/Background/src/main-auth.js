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

import GetLegacyAccountService from 'passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService';
import {AuthEvents} from './events/authEvents';
import IPCHandler from './shared/IPCHandler';
import BuildApiClientOptionsService from 'passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService';
import {OrganizationSettingsEvents} from 'passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents';
import {ConfigEvents} from 'passbolt-browser-extension/src/all/background_page/event/configEvents';
import {LocaleEvents} from './events/localeEvents';
import {DesktopEvents} from './events/desktopEvents';
import DesktopSetAccountController from './controllers/desktopSetAccountController';

/**
 * Represents the main authentication class that sets up an event listener for the `message` event.
 * @class
 */
export default class MainAuth {
  worker = null;

  /**
   * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
   * @constructor
   */
  constructor() {
    this.worker = {port: new IPCHandler()};
    //Listen account setting event
    this.waitForAccountInstanciation();
  }

  /**
   * Wait the Dotnet to instance the account before going further
   */
  waitForAccountInstanciation() {
    this.worker.port.on('passbolt.account.set-current', async(requestId, account) => {
      await localStorage.clear();
      const controller = new DesktopSetAccountController(this.worker, requestId, account);
      await controller._exec();
      await this.listen();
    });
  }

  /**
   * Listen event from the main process using bext listener
   */
  async listen() {
    const account = await GetLegacyAccountService.get();
    const apiClientOptions = await BuildApiClientOptionsService.buildFromAccount(account);
    AuthEvents.listen(this.worker, apiClientOptions, account);
    ConfigEvents.listen(this.worker);
    LocaleEvents.listen(this.worker);
    DesktopEvents.listen(this.worker, apiClientOptions, account);
    OrganizationSettingsEvents.listen(this.worker);
  }
}

