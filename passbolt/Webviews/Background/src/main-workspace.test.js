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

import Main from "./main-workspace";

import {OrganizationSettingsEvents} from "passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents";
import {ConfigEvents} from "passbolt-browser-extension/src/all/background_page/event/configEvents";
import {RoleEvents} from "passbolt-browser-extension/src/all/background_page/event/roleEvents";
import {ResourceTypeEvents} from "passbolt-browser-extension/src/all/background_page/event/resourceTypeEvents";
import {ResourceEvents} from "passbolt-browser-extension/src/all/background_page/event/resourceEvents";
import {GroupEvents} from "passbolt-browser-extension/src/all/background_page/event/groupEvents";
import {FolderEvents} from "passbolt-browser-extension/src/all/background_page/event/folderEvents";
import {SecretEvents} from "passbolt-browser-extension/src/all/background_page/event/secretEvents";
import {CommentEvents} from "passbolt-browser-extension/src/all/background_page/event/commentEvents";
import {ActionLogEvents} from "passbolt-browser-extension/src/all/background_page/event/actionLogEvents";
import {accountDto} from "./data/mockStorage";
import {BACKGROUND_READY, LOCALSTORAGE_CLEAR, LOCALSTORAGE_DELETE, LOCALSTORAGE_UPDATE} from "./enumerations/appEventEnumeration";
import {ShareEvents} from "passbolt-browser-extension/src/all/background_page/event/shareEvents";
import {FavoriteEvents} from "passbolt-browser-extension/src/all/background_page/event/favoriteEvents";
import {TagEvents} from "passbolt-browser-extension/src/all/background_page/event/tagEvents";
import {ImportResourcesEvents} from "passbolt-browser-extension/src/all/background_page/event/importResourcesEvents";
import {PownedPasswordEvents} from "passbolt-browser-extension/src/all/background_page/event/pownedPasswordEvents";
import {RbacEvents} from "./events/rbacEvents";
import {AccountRecoveryEvents} from "./events/accountRecoveryEvents";
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import {DesktopEvents} from "./events/desktopEvents";
import {ExportResourcesEvents} from "./events/exportResourcesEvents";
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import {PasswordPoliciesEvents} from "passbolt-browser-extension/src/all/background_page/event/passwordPoliciesEvents";
import {UserPassphrasePolicies} from "./events/userPassphrasePolicies";
import {ThemeEvents} from "./events/themeEvents";
import {AuthEvents} from "./events/authEvents";
import {KeyringEvents} from "./events/keyringEvents";
import {UserEvents} from "./events/userEvents";
import AuthenticationEventController from "passbolt-browser-extension/src/all/background_page/controller/auth/authenticationEventController";
import StartLoopAuthSessionCheckService from "passbolt-browser-extension/src/all/background_page/service/auth/startLoopAuthSessionCheckService";
import {PasswordExpiryEvents} from "./events/passwordExpiryEvents";
import User from 'passbolt-browser-extension/src/all/background_page/model/user';
import {LocaleEvents} from "./events/localeEvents";

describe("Main workspace class", () => {
  const ipcDataMock = {
    data: {
      topic: "passbolt.desktop.authenticate"
    }
  };
  let main;

  beforeEach(() => {
    window.chrome.webview.addEventListener = jest.fn((event, callback) => {
      if (event === "message") {
        callback(ipcDataMock);
      }
    });

    localStorage.setItem('_passbolt_data', JSON.stringify(accountDto));
    jest.spyOn(GetLegacyAccountService, "get").mockImplementation(() => new AccountEntity(accountDto).toDto());
    jest.spyOn(User, "getInstance").mockImplementation(() => ({getApiClientOptions: () => null}));
    main = new Main(window.chrome.webview);
  });

  afterEach(() => {
    // Cleanup mocks
    jest.resetAllMocks();
  });

  it('should listen to the browser extension events', async() => {
    expect.assertions(26);

    jest.spyOn(AccountRecoveryEvents, "listen");
    jest.spyOn(ActionLogEvents, "listen");
    jest.spyOn(AuthEvents, "listen");
    jest.spyOn(CommentEvents, "listen");
    jest.spyOn(ConfigEvents, "listen");
    jest.spyOn(DesktopEvents, "listen");
    jest.spyOn(ExportResourcesEvents, "listen");
    jest.spyOn(FavoriteEvents, "listen");
    jest.spyOn(FolderEvents, "listen");
    jest.spyOn(GroupEvents, "listen");
    jest.spyOn(ImportResourcesEvents, "listen");
    jest.spyOn(KeyringEvents, "listen");
    jest.spyOn(LocaleEvents, "listen");
    jest.spyOn(OrganizationSettingsEvents, "listen");
    jest.spyOn(PasswordExpiryEvents, "listen");
    jest.spyOn(PasswordPoliciesEvents, "listen");
    jest.spyOn(PownedPasswordEvents, "listen");
    jest.spyOn(RbacEvents, "listen");
    jest.spyOn(ResourceEvents, "listen");
    jest.spyOn(ResourceTypeEvents, "listen");
    jest.spyOn(RoleEvents, "listen");
    jest.spyOn(SecretEvents, "listen");
    jest.spyOn(ShareEvents, "listen");
    jest.spyOn(TagEvents, "listen");
    jest.spyOn(ThemeEvents, "listen");
    jest.spyOn(UserPassphrasePolicies, "listen");
    jest.spyOn(UserEvents, "listen");

    main = new Main();
    await main.initStorage();

    expect(AccountRecoveryEvents.listen).toHaveBeenCalledWith(main.worker, new AccountEntity(accountDto).toDto());
    expect(ActionLogEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(AuthEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(CommentEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ConfigEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(DesktopEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ExportResourcesEvents.listen).toHaveBeenCalledWith(main.worker, new AccountEntity(accountDto).toDto());
    expect(FavoriteEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(FolderEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(GroupEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(ImportResourcesEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(KeyringEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(LocaleEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(OrganizationSettingsEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(PasswordExpiryEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(PasswordPoliciesEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(PownedPasswordEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ResourceEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(RbacEvents.listen).toHaveBeenCalledWith(main.worker, new AccountEntity(accountDto).toDto());
    expect(RoleEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(SecretEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(ShareEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
    expect(TagEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ThemeEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(UserPassphrasePolicies.listen).toHaveBeenCalledWith(main.worker);
    expect(UserEvents.listen).toHaveBeenCalledWith(main.worker, null, new AccountEntity(accountDto).toDto());
  });

  it('should not initialize the local storage if user exist and post a message', async() => {
    expect.assertions(2);

    jest.spyOn(window.chrome.storage.local, "set");
    await main.initStorage();

    expect(window.chrome.storage.local.set).not.toHaveBeenCalled();
    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({topic: BACKGROUND_READY}));
  });

  it('should send an event when localstorage is updated', () => {
    expect.assertions(1);

    const key = "test";
    const value = "with jest";
    window.chrome.storage.local.set(key, value);

    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({topic: LOCALSTORAGE_UPDATE, message: {key, value}}));
  });

  it('should send an event when localstorage is delete', () => {
    expect.assertions(1);

    const key = "test-delete";
    window.chrome.storage.local.remove(key);

    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({topic: LOCALSTORAGE_DELETE, message: key}));
  });

  it('should send an event when localstorage is cleared', () => {
    expect.assertions(1);

    window.chrome.storage.local.clear();

    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({topic: LOCALSTORAGE_CLEAR}));
  });

  it('should listen to authentication event and start loop authentication service', () => {
    expect.assertions(2);

    jest.spyOn(AuthenticationEventController.prototype, "startListen");
    jest.spyOn(StartLoopAuthSessionCheckService.prototype, "exec");

    main = new Main();

    expect(AuthenticationEventController.prototype.startListen).toHaveBeenCalled();
    expect(StartLoopAuthSessionCheckService.prototype.exec).toHaveBeenCalled();
  });
});
