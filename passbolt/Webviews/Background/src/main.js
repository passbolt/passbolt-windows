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

import { AuthEvents } from './events/authEvents';
import { mockStorage } from './data/mockStorage';
import LocalStorage from 'passbolt_-_open_source_password_manager/src/all/background_page/sdk/storage';


/**
 * Represents the main class that sets up an event listener for the `message` event.
 * @class
 */
export default class Main {

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    constructor(webview) {
        this.initStorage();

        webview.addEventListener("message", (event) => {
            this.onMessageReceived(event);
        });
    }

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    onMessageReceived(ipc) {
        AuthEvents.listen(ipc.data)
    }

    /**
     * init the local storage with the mock data in case it does not exist
     */
    async initStorage() {
        if (localStorage.getItem('_passbolt_data') === null) {
            try {
                if (localStorage.length === 0) {
                    Object.keys(mockStorage).forEach((key) => {
                        localStorage.setItem(key, JSON.stringify(mockStorage[key]));
                    });
                }
            } catch (error) {
                console.error('Failed to initialize storage:', error);
            }
        }
        await LocalStorage.init()
    }
}

