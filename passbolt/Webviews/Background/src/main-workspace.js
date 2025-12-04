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
import {PasswordPoliciesEvents} from 'passbolt-browser-extension/src/all/background_page/event/passwordPoliciesEvents';
import {PownedPasswordEvents} from 'passbolt-browser-extension/src/all/background_page/event/pownedPasswordEvents';
import {ImportResourcesEvents} from 'passbolt-browser-extension/src/all/background_page/event/importResourcesEvents';
import {AccountRecoveryEvents} from './events/accountRecoveryEvents';
import {ExportResourcesEvents} from './events/exportResourcesEvents';
import {RbacEvents} from './events/rbacEvents';
import {BACKGROUND_READY,CLIPBOARD_SET_TEXT} from './enumerations/appEventEnumeration';
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import {DesktopEvents} from './events/desktopEvents';
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';
import {MfaEvents} from 'passbolt-browser-extension/src/all/background_page/event/mfaEvents';
import {MultiFactorAuthenticationEvents} from 'passbolt-browser-extension/src/all/background_page/event/multiFactorAuthenticationEvents';
import {ThemeEvents} from './events/themeEvents';
import {UserEvents} from './events/userEvents';
import {AuthEvents} from './events/authEvents';
import {ClipboardEvents} from './events/clipboardEvents';
import {UserPassphrasePolicies} from './events/userPassphrasePolicies';
import {KeyringEvents} from './events/keyringEvents';
import {LocaleEvents} from './events/localeEvents';
import StartLoopAuthSessionCheckService from 'passbolt-browser-extension/src/all/background_page/service/auth/startLoopAuthSessionCheckService';
import User from 'passbolt-browser-extension/src/all/background_page/model/user';
import {PasswordExpiryEvents} from './events/passwordExpiryEvents';
import GlobalAlarmService from './services/alarm/globalAlarmService';
import KeepSessionAliveService from 'passbolt-browser-extension/src/all/background_page/service/session_storage/keepSessionAliveService';
import {AccountEvents} from 'passbolt-browser-extension/src/all/background_page/event/accountEvents';
import {PermissionEvents} from 'passbolt-browser-extension/src/all/background_page/event/permissionEvents';
import {MetadataEvents} from './events/metadataEvents';
import {FavoriteEvents} from './events/favoriteEvents';
import {SecretHistoryEvents} from './events/secretHistoryEvents';

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
    this.worker = {port: new IPCHandler()};

    await this.listenToEvents();
    StartLoopAuthSessionCheckService.exec();
    KeepSessionAliveService.start();
    browser.alarms.onAlarm.removeListener(GlobalAlarmService.exec);
    browser.alarms.onAlarm.addListener(GlobalAlarmService.exec);
    /*
     * Applying the clipboard polyfill requires the communication port to request the native application, so it is applied here.
     * todo move the polyfill definition with others to remain consistant.
     */
    navigator.clipboard.writeText = async(data) => await this.worker.port.emit(CLIPBOARD_SET_TEXT, data);
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
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const account = await GetLegacyAccountService.get({role: true});
    AccountEvents.listen(this.worker, apiClientOptions, account);
    AuthEvents.listen(this.worker);
    AccountRecoveryEvents.listen(this.worker, account);
    ActionLogEvents.listen(this.worker, apiClientOptions);
    ClipboardEvents.listen(this.worker);
    CommentEvents.listen(this.worker, apiClientOptions);
    ConfigEvents.listen(this.worker);
    DesktopEvents.listen(this.worker, apiClientOptions, account);
    ExportResourcesEvents.listen(this.worker, account);
    FavoriteEvents.listen(this.worker, apiClientOptions, account);
    FolderEvents.listen(this.worker, apiClientOptions, account);
    GroupEvents.listen(this.worker, apiClientOptions, account);
    ImportResourcesEvents.listen(this.worker, apiClientOptions, account);
    KeyringEvents.listen(this.worker, null, account);
    LocaleEvents.listen(this.worker);
    MfaEvents.listen(this.worker, apiClientOptions);
    MetadataEvents.listen(this.worker, apiClientOptions, account);
    MultiFactorAuthenticationEvents.listen(this.worker, apiClientOptions);
    OrganizationSettingsEvents.listen(this.worker);
    PownedPasswordEvents.listen(this.worker);
    UserEvents.listen(this.worker, apiClientOptions, account);
    RbacEvents.listen(this.worker, account);
    ResourceEvents.listen(this.worker, apiClientOptions, account);
    ResourceTypeEvents.listen(this.worker, apiClientOptions);
    RoleEvents.listen(this.worker, apiClientOptions);
    SecretEvents.listen(this.worker, apiClientOptions, account);
    SecretHistoryEvents.listen(this.worker, apiClientOptions, account);
    ShareEvents.listen(this.worker, apiClientOptions, account);
    TagEvents.listen(this.worker, apiClientOptions, account);
    ThemeEvents.listen(this.worker);
    PasswordExpiryEvents.listen(this.worker, apiClientOptions, account);
    PasswordPoliciesEvents.listen(this.worker, apiClientOptions, account);
    PermissionEvents.listen(this.worker, apiClientOptions, account);
    UserPassphrasePolicies.listen(this.worker);
    window.chrome.webview.postMessage(JSON.stringify({topic: BACKGROUND_READY}));
  }
}
