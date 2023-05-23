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

import {AuthEvents} from './events/authEvents';
import IPCHandler from './shared/IPCHandler';
import {OrganizationSettingsEvents} from "passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents";
import {ConfigEvents} from "passbolt-browser-extension/src/all/background_page/event/configEvents";
import {UserEvents} from "passbolt-browser-extension/src/all/background_page/event/userEvents";
import {LocaleEvents} from "passbolt-browser-extension/src/all/background_page/event/localeEvents";
import {RoleEvents} from 'passbolt-browser-extension/src/all/background_page/event/roleEvents';
import {ResourceTypeEvents} from 'passbolt-browser-extension/src/all/background_page/event/resourceTypeEvents';
import {ResourceEvents} from 'passbolt-browser-extension/src/all/background_page/event/resourceEvents';
import {GroupEvents} from 'passbolt-browser-extension/src/all/background_page/event/groupEvents';
import {FolderEvents} from 'passbolt-browser-extension/src/all/background_page/event/folderEvents';
import {SecretEvents} from 'passbolt-browser-extension/src/all/background_page/event/secretEvents';
import {CommentEvents} from 'passbolt-browser-extension/src/all/background_page/event/commentEvents';
import {ActionLogEvents} from 'passbolt-browser-extension/src/all/background_page/event/actionLogEvents';
import {BACKGROUNDREADY} from './enumerations/appEventEnumeration';
import StorageService from './services/storageService';
/**
 * Represents the main class that sets up an event listener for the `message` event.
 * @class
 */
export default class Main {

    worker = null;

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    constructor(webview) {
        this.storageService = new StorageService();
        this.initStorage();
        this.worker = {port: new IPCHandler()};
        OrganizationSettingsEvents.listen(this.worker);
        ConfigEvents.listen(this.worker);
        LocaleEvents.listen(this.worker);
        RoleEvents.listen(this.worker);
        ResourceTypeEvents.listen(this.worker);
        ResourceEvents.listen(this.worker);
        GroupEvents.listen(this.worker);
        UserEvents.listen(this.worker);
        FolderEvents.listen(this.worker);
        SecretEvents.listen(this.worker);
        CommentEvents.listen(this.worker);
        ActionLogEvents.listen(this.worker);
        this.initMainCommunication(webview);
    }

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    initMainCommunication(webview) {
        webview.addEventListener("message", (ipc) => {
            AuthEvents.listen(ipc.data)
        });
    }

    /**
     * init the local storage with the mock data in case it does not exist
     */
    async initStorage() {
        await this.storageService.initPassboltData();
        window.chrome.webview.postMessage(JSON.stringify({ topic: BACKGROUNDREADY }));
    }
}

