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
import {accountDto} from './data/mockStorage';
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';
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
import AccountModel from 'passbolt-browser-extension/src/all/background_page/model/account/accountModel';
import AccountEntity from 'passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity';
import {BACKGROUNDREADY} from './enumerations/appEventEnumeration';
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
        const worker = { port: new IPCHandler() };
        OrganizationSettingsEvents.listen(worker);
        ConfigEvents.listen(worker);
        UserEvents.listen(worker);
        LocaleEvents.listen(worker);
        RoleEvents.listen(worker);
        ResourceTypeEvents.listen(worker);
        ResourceEvents.listen(worker);
        GroupEvents.listen(worker);
        UserEvents.listen(worker);
        FolderEvents.listen(worker);
        SecretEvents.listen(worker);
        CommentEvents.listen(worker);
        ActionLogEvents.listen(worker);
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
        if (localStorage.getItem('_passbolt_data') === null) {
            try {
                localStorage.setItem("_passbolt_data", JSON.stringify({}))
                const accountModel = new AccountModel();
                const account = new AccountEntity(accountDto);
                await accountModel.add(account);
            } catch (error) {
                console.error(error)
            }
        }
        await LocalStorage.init();
        window.chrome.webview.postMessage(JSON.stringify({ topic: BACKGROUNDREADY }));
    }
}

