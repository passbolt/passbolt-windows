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

import {LOCALSTORAGE_CLEAR, LOCALSTORAGE_DELETE, LOCALSTORAGE_UPDATE} from "../enumerations/appEventEnumeration";

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
        set:  (storage, value = "") => {
          if (typeof storage === "object") {
            const keys = Object.keys(storage);
            const values = Object.values(storage);
            localStorage.setItem(keys[0], JSON.stringify(values[0]));
            this.onStorageChanges(keys[0], JSON.stringify(values[0]));
          } else {
            localStorage.setItem(storage, value);
            this.onStorageChanges(storage, value);
          }
        },
        remove: key => {
          localStorage.removeItem(key);
          this.onStorageDelete(key);
        },
        clear: () => {
          localStorage.clear();
          this.onStorageCleared();
        }
      }
    };
  }

  /**
   * Match the get storage from the localstorage of the webview
   * @param {string} key
   * @param {function} callback
   * @returns
   */
  getStorage(key, callback) {
    return new Promise((resolve, reject) => {
      try {
        let localKey = key;
        if (Array.isArray(key)) {
          localKey = key[0];
        }
        const value = localStorage.getItem(localKey);
        const response = value !== null ? value : undefined;
        if (callback) {
          callback({_passbolt_data: response ? JSON.parse(response) : undefined});
        }

        const result = {};
        result[localKey] = response ? JSON.parse(response) : undefined;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Send event whenever storage has been cleared
   * @param {string} key
   * @returns
   */
  onStorageCleared() {
    window.chrome.webview.postMessage(JSON.stringify({topic: LOCALSTORAGE_CLEAR}));
  }

  /**
   * Send event whenever storage has a entry deleted
   * @param {string} key
   * @returns
   */
  onStorageDelete(key) {
    window.chrome.webview.postMessage(JSON.stringify({topic: LOCALSTORAGE_DELETE, message: key}));
  }

  /**
   * Send event whenever storage has been changed
   * @param {string} key
   * @returns
   */
  onStorageChanges(key, value) {
    window.chrome.webview.postMessage(JSON.stringify({topic: LOCALSTORAGE_UPDATE, message: {key, value}}));
  }
}

/**
 * Init the polyfill only if runtime is missing
 */
if (!window.chrome.storage?.local) {
  new StoragePolyfill();
}
