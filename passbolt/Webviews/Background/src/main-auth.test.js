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
 * @since         0.3.0
 */

import Main from "./main-auth";

import {AuthEvents} from "./events/authEvents";
import {OrganizationSettingsEvents} from "passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents";
import {ConfigEvents} from "passbolt-browser-extension/src/all/background_page/event/configEvents";
import {LocaleEvents} from "./events/localeEvents";
import {DesktopEvents} from "./events/desktopEvents";
import GetLegacyAccountService from "passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService";
import {v4 as uuid} from 'uuid';
import {defaultApiClientOptions} from "passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data";
import BuildApiClientOptionsService from "passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService";

describe("Main authentication class", () => {
  let main;
  const mockedAccount = {user_id: uuid(), domain: "https://test-domain.passbolt.com"};

  beforeEach(() => {
    // Cleanup mocks
    jest.resetAllMocks();
    jest.spyOn(GetLegacyAccountService, 'get').mockImplementation(() => mockedAccount);
    jest.spyOn(BuildApiClientOptionsService, 'buildFromAccount').mockImplementation(() => defaultApiClientOptions());
  });

  it('should listen to the browser extension events', async() => {
    expect.assertions(5);

    jest.spyOn(AuthEvents, "listen");
    jest.spyOn(ConfigEvents, "listen");
    jest.spyOn(DesktopEvents, "listen");
    jest.spyOn(LocaleEvents, "listen");
    jest.spyOn(OrganizationSettingsEvents, "listen");

    main = new Main();
    await main.listen();

    expect(AuthEvents.listen).toHaveBeenCalledWith(main.worker, defaultApiClientOptions(), mockedAccount);
    expect(ConfigEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(DesktopEvents.listen).toHaveBeenCalledWith(main.worker, defaultApiClientOptions(), mockedAccount);
    expect(LocaleEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(OrganizationSettingsEvents.listen).toHaveBeenCalledWith(main.worker);
  });
});
