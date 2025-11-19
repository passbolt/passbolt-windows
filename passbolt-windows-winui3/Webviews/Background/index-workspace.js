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

import './src/polyfill/browserPolyfill';
import "./src/polyfill/commandPolyfill"
import './src/polyfill/desktopPolyfill';
import './src/polyfill/storagePolyfill';
import './src/polyfill/runtimePolyfill';
import './src/polyfill/alarmPolyfill';
import './src/polyfill/cookiePolyfill';
import './src/polyfill/scriptingPolyfill';
import './src/polyfill/sessionStoragePolyfill';
import Main from "./src/main-workspace";


new Main();