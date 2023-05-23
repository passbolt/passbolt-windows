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
 * @since         0.0.1
 */

/**
 * Polyfill to match the webview storage with the bext storage
 */
class StoragePolyfill {

    constructor() {
        this.initLocaleStorage();
    }

    /**
     * init the chrome storage with the localstorage webview
     */
    initLocaleStorage() {
        window.chrome.storage = {
            local: {
                get: this.getStorage,
                set: function (storage, value = "") {
                    if (typeof storage === "object") {
                        const keys = Object.keys(storage);
                        const values = Object.values(storage);
                        localStorage.setItem(keys[0], JSON.stringify(values[0]));
                    } else {
                        localStorage.setItem(storage, value);
                    }
                },
                remove: function (key) {
                    localStorage.removeItem(key);
                },
                clear: function () {
                    localStorage.clear();
                }
            }
        }
    }

    /**
     * Match the get storage from the localstorage of the webview
     * @param {string} key 
     * @param {function} callback 
     * @returns 
     */
    getStorage(key, callback) {
        return new Promise(function (resolve, reject) {
            try {
                let localKey = key;
                if (Array.isArray(key)) {
                    localKey = key[0]
                }
                const value = localStorage.getItem(localKey);
                const response = value !== null ? value : undefined;
                if (callback) {
                    callback({ _passbolt_data: response ? JSON.parse(response) : undefined });
                }

                const result = {}
                result[localKey] = response ? JSON.parse(response) : undefined
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}

/**
 * init localstorage if not exist
 */
new StoragePolyfill();
