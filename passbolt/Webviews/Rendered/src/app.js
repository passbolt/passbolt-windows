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
import React from "react";
import ReactDOM from "react-dom";
import IPCHandler from "./shared/IPCHandler";
import ExtBootstrapApp from "./ExtBootstrapApp";

export async function main() {
  // Port connection
  const channel = new IPCHandler();
  // Start ExtBootstrapApp
  const storage = localStorage;
  const domContainer = document.createElement("div");
  document.body.appendChild(domContainer);
  ReactDOM.render(<ExtBootstrapApp port={channel} storage={storage} />, domContainer);
}

