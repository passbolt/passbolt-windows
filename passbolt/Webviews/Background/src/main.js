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
import {LocaleEvents} from "passbolt-browser-extension/src/all/background_page/event/localeEvents";
import {RoleEvents} from 'passbolt-browser-extension/src/all/background_page/event/roleEvents';
import {ResourceTypeEvents} from 'passbolt-browser-extension/src/all/background_page/event/resourceTypeEvents';
import {ResourceEvents} from 'passbolt-browser-extension/src/all/background_page/event/resourceEvents';
import {GroupEvents} from 'passbolt-browser-extension/src/all/background_page/event/groupEvents';
import {FolderEvents} from 'passbolt-browser-extension/src/all/background_page/event/folderEvents';
import {SecretEvents} from 'passbolt-browser-extension/src/all/background_page/event/secretEvents';
import {ShareEvents} from 'passbolt-browser-extension/src/all/background_page/event/shareEvents';
import {CommentEvents} from 'passbolt-browser-extension/src/all/background_page/event/commentEvents';
import {ActionLogEvents} from 'passbolt-browser-extension/src/all/background_page/event/actionLogEvents';
import {BACKGROUND_READY} from './enumerations/appEventEnumeration';
import StorageService from './services/storageService';
import {KeyringEvents} from 'passbolt-browser-extension/src/all/background_page/event/keyringEvents';
import {TagEvents} from 'passbolt-browser-extension/src/all/background_page/event/tagEvents';
import {FavoriteEvents} from 'passbolt-browser-extension/src/all/background_page/event/favoriteEvents';
import {PownedPasswordEvents} from 'passbolt-browser-extension/src/all/background_page/event/pownedPasswordEvents';
import {PasswordGeneratorEvents} from 'passbolt-browser-extension/src/all/background_page/event/passwordGeneratorEvents';
import {ImportResourcesEvents} from 'passbolt-browser-extension/src/all/background_page/event/importResourcesEvents';
import {AccountRecoveryEvents} from './events/accountRecoveryEvents';
import {ExportResourcesEvents} from './events/exportResourcesEvents';
import AccountEntity from 'passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity';
import {accountDto} from './data/mockStorage';
import {RbacEvents} from './events/rbacEvents';

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
        AccountRecoveryEvents.listen(this.worker, new AccountEntity(accountDto));
        ActionLogEvents.listen(this.worker);
        CommentEvents.listen(this.worker);
        ConfigEvents.listen(this.worker);
        ExportResourcesEvents.listen(this.worker);
        FavoriteEvents.listen(this.worker);
        FolderEvents.listen(this.worker);
        GroupEvents.listen(this.worker);
        ImportResourcesEvents.listen(this.worker);
        KeyringEvents.listen(this.worker);
        LocaleEvents.listen(this.worker);
        OrganizationSettingsEvents.listen(this.worker);
        PasswordGeneratorEvents.listen(this.worker);
        ResourceEvents.listen(this.worker);
        ResourceTypeEvents.listen(this.worker);
        RoleEvents.listen(this.worker);
        SecretEvents.listen(this.worker);
        ShareEvents.listen(this.worker);
        TagEvents.listen(this.worker);
        PownedPasswordEvents.listen(this.worker);
        this.initMainCommunication(webview);
    }

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    initMainCommunication(webview) {
        webview.addEventListener("message", (ipc) => {
            AuthEvents.listen(this.worker, ipc.data)
        });
    }

    /**
     * init the local storage with the mock data in case it does not exist
     */
    async initStorage() {
        await this.storageService.initPassboltData();
        window.chrome.webview.postMessage(JSON.stringify({ topic: BACKGROUND_READY }));
    }
}

