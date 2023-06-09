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

import Main from "./main";

import {AuthEvents} from "./events/authEvents";
import {OrganizationSettingsEvents} from "passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents";
import {ConfigEvents} from "passbolt-browser-extension/src/all/background_page/event/configEvents";
import {UserEvents} from "passbolt-browser-extension/src/all/background_page/event/userEvents";
import {LocaleEvents} from "passbolt-browser-extension/src/all/background_page/event/localeEvents";
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
import {KeyringEvents} from "passbolt-browser-extension/src/all/background_page/event/keyringEvents";
import {ShareEvents} from "passbolt-browser-extension/src/all/background_page/event/shareEvents";
import {FavoriteEvents} from "passbolt-browser-extension/src/all/background_page/event/favoriteEvents";
import {TagEvents} from "passbolt-browser-extension/src/all/background_page/event/tagEvents";
import {PasswordGeneratorEvents} from "passbolt-browser-extension/src/all/background_page/event/passwordGeneratorEvents";
import {ImportResourcesEvents} from "passbolt-browser-extension/src/all/background_page/event/importResourcesEvents";
import {PownedPasswordEvents} from "passbolt-browser-extension/src/all/background_page/event/pownedPasswordEvents";
import {AccountRecoveryEvents} from "./events/accountRecoveryEvents";

describe("Main class", () => {
  const ipcDataMock = {
    data: {
      topic: "passbolt.desktop.authenticate"
    }
  };
  let main;

  beforeEach(() => {
    window.chrome.webview.addEventListener = jest.fn((event, callback) => {
      if (event === "message") {
        callback(ipcDataMock)
      }
    })

    main = new Main(window.chrome.webview);
  })

  afterEach(() => {
    // Cleanup mocks
    jest.resetAllMocks();
  });

  it('should listen to authenticate event', () => {
    expect.assertions(2);

    jest.spyOn(AuthEvents, "listen");
    new Main(window.chrome.webview);
    const callback = window.chrome.webview.addEventListener.mock.calls[0][1];
    callback(ipcDataMock);

    expect(window.chrome.webview.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    expect(AuthEvents.listen).toHaveBeenCalledWith(ipcDataMock.data);
  });


  it('should listen to the browser extension events', () => {
    expect.assertions(20);

    jest.spyOn(OrganizationSettingsEvents, "listen");
    jest.spyOn(ConfigEvents, "listen");
    jest.spyOn(UserEvents, "listen");
    jest.spyOn(LocaleEvents, "listen");
    jest.spyOn(RoleEvents, "listen");
    jest.spyOn(ResourceTypeEvents, "listen");
    jest.spyOn(ResourceEvents, "listen");
    jest.spyOn(GroupEvents, "listen");
    jest.spyOn(FolderEvents, "listen");
    jest.spyOn(SecretEvents, "listen");
    jest.spyOn(CommentEvents, "listen");
    jest.spyOn(ActionLogEvents, "listen");
    jest.spyOn(KeyringEvents, "listen");
    jest.spyOn(ShareEvents, "listen");
    jest.spyOn(FavoriteEvents, "listen");
    jest.spyOn(ImportResourcesEvents, "listen");
    jest.spyOn(PasswordGeneratorEvents, "listen");
    jest.spyOn(TagEvents, "listen");
    jest.spyOn(PownedPasswordEvents, "listen");

    main = new Main(window.chrome.webview);
    const callback = window.chrome.webview.addEventListener.mock.calls[0][1];
    callback(ipcDataMock);

    expect(window.chrome.webview.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    expect(OrganizationSettingsEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ConfigEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(UserEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(LocaleEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(RoleEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ResourceTypeEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ResourceEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(GroupEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(FolderEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(SecretEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(CommentEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ActionLogEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(KeyringEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ShareEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(FavoriteEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ImportResourcesEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(PasswordGeneratorEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(TagEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(PownedPasswordEvents.listen).toHaveBeenCalledWith(main.worker);
  });

  it('should initialize the local storage and post a message', async () => {
    expect.assertions(12);

    localStorage.removeItem('_passbolt_data')

    await main.initStorage();

    expect(localStorage.getItem("_passbolt_data")).not.toBeNull();

    const storage = JSON.parse(localStorage.getItem("_passbolt_data"))
    const config = storage.config
    const privateGPGKeys = JSON.parse(storage["passbolt-private-gpgkeys"])
    const publicGPGKeys = JSON.parse(storage["passbolt-public-gpgkeys"])

    expect(config["user.settings.securityToken.code"]).toEqual(accountDto.security_token.code);
    expect(config["user.settings.securityToken.color"]).toEqual(accountDto.security_token.color);
    expect(config["user.settings.securityToken.textColor"]).toEqual(accountDto.security_token.textcolor);
    expect(config["user.settings.trustedDomain"]).toEqual(accountDto.domain);
    expect(config["user.id"]).toEqual(accountDto.user_id);
    expect(config["user.username"]).toEqual(accountDto.username);
    expect(config["user.firstname"]).toEqual(accountDto.first_name);
    expect(config["user.lastname"]).toEqual(accountDto.last_name);
    expect(privateGPGKeys).not.toBeNull();
    expect(publicGPGKeys).not.toBeNull();
    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: BACKGROUND_READY }));
  });

  it('should not initialize the local storage if user exist and post a message', async () => {
    expect.assertions(2);

    jest.spyOn(window.chrome.storage.local, "set")
    await main.initStorage();

    expect(window.chrome.storage.local.set).not.toHaveBeenCalled();
    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: BACKGROUND_READY }));
  });

  it('should send an event when localstorage is updated', () => {
    expect.assertions(1);

    const key = "test";
    const value = "with jest";
    window.chrome.storage.local.set(key, value)

    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: LOCALSTORAGE_UPDATE, message: {key, value} }));
  });

  it('should send an event when localstorage is delete', () => {
    expect.assertions(1);

    const key = "test-delete";
    window.chrome.storage.local.remove(key)

    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: LOCALSTORAGE_DELETE, message: key }));
  });

  it('should send an event when localstorage is cleared', () => {
    expect.assertions(1);

    window.chrome.storage.local.clear()

    expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({ topic: LOCALSTORAGE_CLEAR }));
  });
});
