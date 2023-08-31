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

import {AuthImportEvents} from "./events/authImportEvents";
import Main from "./main-import";

describe("Main import class", () => {

  let main;

  beforeEach(() => {
    main = new Main(window.chrome.webview);
  })

  afterEach(() => {
    // Cleanup mocks
    jest.resetAllMocks();
  });

  it('should listen to the browser extension events', async () => {
    expect.assertions(1);

    jest.spyOn(AuthImportEvents, "listen")

    main = new Main();

    expect(AuthImportEvents.listen).toHaveBeenCalledWith(main.worker);
  });
});
