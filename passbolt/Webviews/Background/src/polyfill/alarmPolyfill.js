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
 * @since         0.0.1
 */

/**
 * Polyfill to init alarms from bext
 */
class AlarmPolyfill {

    constructor() {
        window.chrome.alarms = {
            get: this.get,
            clear: this.clear,
            create: this.create,
            getAll: this.getAll,
            onAlarm: {
                addListener: this.addListener,
                removeListener: this.removeListener,
                hasListener() {return false;}
            }
        };
    }
    get(name) {
        return new Promise(resolve => {
            resolve(null);
        });
    }
    addListener(name) { }
    removeListener(name) { }
    getAll() { }
    clear() {
        return new Promise(resolve => {
            resolve();
        });
    }
    create(name, callback) { }
}

/**
 * Init the polyfill only if runtime is missing
 */
if (!window.chrome.alarms) {
    new AlarmPolyfill();
} 