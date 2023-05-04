/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
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

import App from "./src/app";
import IPCHandler from "./src/shared/IPCHandler";
import React from "react";
import ReactDOM from "react-dom";
import WebviewStorage from "./src/shared/WebviewStorage";

export async function main() {
    // Port connection
    const channel = new IPCHandler();
    // Start ExtBootstrapApp
    const storage = new WebviewStorage().storage;
    const domContainer = document.createElement("div");
    document.body.appendChild(domContainer);
    ReactDOM.render(<App port={channel} storage={storage} />, domContainer);
}

main()