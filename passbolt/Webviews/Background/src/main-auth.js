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

import {AuthEvents} from './events/authEvents';
import IPCHandler from './shared/IPCHandler';
import {OrganizationSettingsEvents} from 'passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents';
import {ConfigEvents} from 'passbolt-browser-extension/src/all/background_page/event/configEvents';
import {LocaleEvents} from 'passbolt-browser-extension/src/all/background_page/event/localeEvents';
import {DesktopEvents} from './events/desktopEvents';

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
        this.listen();
    }

    /**
     * Listen event from the main process using bext listener
     */
    async listen() {
        await localStorage.clear() 
        AuthEvents.listen(this.worker)
        ConfigEvents.listen(this.worker);
        LocaleEvents.listen(this.worker);
        DesktopEvents.listen(this.worker);
        OrganizationSettingsEvents.listen(this.worker);
    }
}

