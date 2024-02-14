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

import IPCHandler from './shared/IPCHandler';
import {OrganizationSettingsEvents} from "passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents";
import {ConfigEvents} from "passbolt-browser-extension/src/all/background_page/event/configEvents";
import {RoleEvents} from 'passbolt-browser-extension/src/all/background_page/event/roleEvents';
import {ResourceTypeEvents} from 'passbolt-browser-extension/src/all/background_page/event/resourceTypeEvents';
import {ResourceEvents} from 'passbolt-browser-extension/src/all/background_page/event/resourceEvents';
import {GroupEvents} from 'passbolt-browser-extension/src/all/background_page/event/groupEvents';
import {FolderEvents} from 'passbolt-browser-extension/src/all/background_page/event/folderEvents';
import {SecretEvents} from 'passbolt-browser-extension/src/all/background_page/event/secretEvents';
import {ShareEvents} from 'passbolt-browser-extension/src/all/background_page/event/shareEvents';
import {CommentEvents} from 'passbolt-browser-extension/src/all/background_page/event/commentEvents';
import {ActionLogEvents} from 'passbolt-browser-extension/src/all/background_page/event/actionLogEvents';
import {TagEvents} from 'passbolt-browser-extension/src/all/background_page/event/tagEvents';
import {FavoriteEvents} from 'passbolt-browser-extension/src/all/background_page/event/favoriteEvents';
import {PasswordPoliciesEvents} from 'passbolt-browser-extension/src/all/background_page/event/passwordPoliciesEvents';
import {PownedPasswordEvents} from 'passbolt-browser-extension/src/all/background_page/event/pownedPasswordEvents';
import {ImportResourcesEvents} from 'passbolt-browser-extension/src/all/background_page/event/importResourcesEvents';
import {AccountRecoveryEvents} from './events/accountRecoveryEvents';
import {ExportResourcesEvents} from './events/exportResourcesEvents';
import {RbacEvents} from './events/rbacEvents';
import {BACKGROUND_READY} from './enumerations/appEventEnumeration';
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import {DesktopEvents} from './events/desktopEvents';
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';
import {MfaEvents} from 'passbolt-browser-extension/src/all/background_page/event/mfaEvents';
import {ThemeEvents} from './events/themeEvents';
import {UserEvents} from './events/userEvents';
import {AuthEvents} from './events/authEvents';
import {UserPassphrasePolicies} from './events/userPassphrasePolicies';
import {KeyringEvents} from './events/keyringEvents';
import {LocaleEvents} from './events/localeEvents';
import AuthenticationEventController from 'passbolt-browser-extension/src/all/background_page/controller/auth/authenticationEventController';
import StartLoopAuthSessionCheckService from 'passbolt-browser-extension/src/all/background_page/service/auth/startLoopAuthSessionCheckService';
import GpgAuth from 'passbolt-browser-extension/src/all/background_page/model/gpgauth';
import User from 'passbolt-browser-extension/src/all/background_page/model/user';
import {PasswordExpiryEvents} from './events/passwordExpiryEvents';

/**
 * Represents the main workspace class that sets up an event listener for the `message` event.
 * @class
 */
export default class MainWorkspace {
  worker = null;

  /**
   * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
   * @constructor
   */
  constructor() {
    this.initWorkspace();
  }

  /**
   * init the workspace storage and events
   */
  async initWorkspace() {
    await this.initStorage();
    this.worker = { port: new IPCHandler() };
    this.auth = new GpgAuth();

    // Start session check: Needed to display the session expired on the screen
    const authenticationEventController = new AuthenticationEventController(this.worker);
    authenticationEventController.startListen();
    const startLoopAuthSessionCheckService = new StartLoopAuthSessionCheckService(this.auth);
    startLoopAuthSessionCheckService.exec();

    await this.listenToEvents()
  }

  /**
   * init the local storage with the account data
   */
  async initStorage() {
    await LocalStorage.init();
    await Config.init();
  }

  /**
   * init the listeners for events
   */
  async listenToEvents() {
    const apiClientOptions = await User.getInstance().getApiClientOptions()
    const account = await GetLegacyAccountService.get({ role: true });

    AuthEvents.listen(this.worker);
    AccountRecoveryEvents.listen(this.worker, account);
    ActionLogEvents.listen(this.worker, apiClientOptions);
    CommentEvents.listen(this.worker);
    ConfigEvents.listen(this.worker);
    DesktopEvents.listen(this.worker);
    ExportResourcesEvents.listen(this.worker, account);
    FavoriteEvents.listen(this.worker, apiClientOptions, account);
    FolderEvents.listen(this.worker, apiClientOptions, account);
    GroupEvents.listen(this.worker, apiClientOptions, account);
    ImportResourcesEvents.listen(this.worker, apiClientOptions, account);
    KeyringEvents.listen(this.worker, null, account);
    LocaleEvents.listen(this.worker);
    MfaEvents.listen(this.worker, apiClientOptions);
    OrganizationSettingsEvents.listen(this.worker);
    PownedPasswordEvents.listen(this.worker);
    UserEvents.listen(this.worker, null, account);
    RbacEvents.listen(this.worker, account);
    ResourceEvents.listen(this.worker, apiClientOptions, account);
    ResourceTypeEvents.listen(this.worker, apiClientOptions);
    RoleEvents.listen(this.worker, apiClientOptions);
    SecretEvents.listen(this.worker, apiClientOptions, account);
    ShareEvents.listen(this.worker, apiClientOptions, account);
    TagEvents.listen(this.worker, apiClientOptions, account);
    ThemeEvents.listen(this.worker);
    PasswordExpiryEvents.listen(this.worker, apiClientOptions, account);
    PasswordPoliciesEvents.listen(this.worker, apiClientOptions, account);
    UserPassphrasePolicies.listen(this.worker);
    window.chrome.webview.postMessage(JSON.stringify({ topic: BACKGROUND_READY }));
  }
}
