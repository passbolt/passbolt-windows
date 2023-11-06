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
import {LocaleEvents} from "passbolt-browser-extension/src/all/background_page/event/localeEvents";
import {DesktopEvents} from "./events/desktopEvents";

describe("Main authentication class", () => {
  let main;

  afterEach(() => {
    // Cleanup mocks
    jest.resetAllMocks();
  });

  it('should listen to the browser extension events', async() => {
    expect.assertions(5);

    jest.spyOn(AuthEvents, "listen");
    jest.spyOn(ConfigEvents, "listen");
    jest.spyOn(DesktopEvents, "listen");
    jest.spyOn(LocaleEvents, "listen");
    jest.spyOn(OrganizationSettingsEvents, "listen");

    main = new Main();

    expect(AuthEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(ConfigEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(DesktopEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(LocaleEvents.listen).toHaveBeenCalledWith(main.worker);
    expect(OrganizationSettingsEvents.listen).toHaveBeenCalledWith(main.worker);
  });
});
