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

import DesktopAuthenticateController from "../controllers/desktopAuthenticateController";

const listen = function (worker) {
  /*
   * Attempt to login the current user.
   *
   * @listens passbolt.desktop.authenticate
   */
  switch (worker.topic) {
    case "passbolt.desktop.authenticate":
      const controller = new DesktopAuthenticateController();
      controller._exec();
      break;
    default:
      console.log(`Unsupported topic: ${worker.topic}`)
      break;
  }
}

export const AuthEvents = { listen };
