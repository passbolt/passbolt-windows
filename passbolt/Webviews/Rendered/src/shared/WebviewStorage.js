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


class WebviewStorage {

    constructor() {}

    get storage() {
        return {
            local: {
                get: this.getStorage,
                set: function (key, value) {
                    localStorage.setItem(key, value);
                },
                remove: function (key) {
                    localStorage.removeItem(key);
                },
                clear: function () {
                    localStorage.clear();
                },
            },
            onChanged: {
                addListener: function (callback) {
                    addEventListener("storage", (event) => {
                        const changes = {}
                        const key = event.key;
                        try { 
                            changes[key] = {newValue: JSON.parse(event.newValue)}
                        } catch {
                            changes[key] = {newValue: event.newValue}
                        }
                        callback(changes)
                    });
                }
            }
        }
    }

    async getStorage(key) {
      const value = localStorage.getItem(key);
      return {
        [key]: JSON.parse(value)
      };
    }
}

export default WebviewStorage;
