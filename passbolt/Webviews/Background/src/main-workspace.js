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
    this.initStorage();
    this.worker = {port: new IPCHandler()};
    ActionLogEvents.listen(this.worker);
    AuthEvents.listen(this.worker);
    CommentEvents.listen(this.worker);
    ConfigEvents.listen(this.worker);
    DesktopEvents.listen(this.worker);
    FavoriteEvents.listen(this.worker);
    FolderEvents.listen(this.worker);
    LocaleEvents.listen(this.worker);
    MfaEvents.listen(this.worker);
    OrganizationSettingsEvents.listen(this.worker);
    PownedPasswordEvents.listen(this.worker);
    ResourceTypeEvents.listen(this.worker);
    RoleEvents.listen(this.worker);
    TagEvents.listen(this.worker);
    ThemeEvents.listen(this.worker);
    UserPassphrasePolicies.listen(this.worker);
  }

  /**
   * init the local storage with the account data
   */
  async initStorage() {
    await LocalStorage.init();
    await Config.init();  
    const account = await GetLegacyAccountService.get({role: true});
    AccountRecoveryEvents.listen(this.worker, account);
    ExportResourcesEvents.listen(this.worker, account);
    GroupEvents.listen(this.worker, null, account);
    ImportResourcesEvents.listen(this.worker, null, account);
    KeyringEvents.listen(this.worker, null, account);
    UserEvents.listen(this.worker, null, account);
    RbacEvents.listen(this.worker, account);
    ResourceEvents.listen(this.worker, null, account);
    SecretEvents.listen(this.worker, null, account);
    ShareEvents.listen(this.worker, null, account);
    PasswordPoliciesEvents.listen(this.worker, null, account);
    window.chrome.webview.postMessage(JSON.stringify({topic: BACKGROUND_READY}));  
  }
}

