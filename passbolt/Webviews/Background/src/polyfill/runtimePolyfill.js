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

import {version} from '../../package.json';

/**
 * Polyfill to init a fake runtime to match with bext runtime requierement
 */
/**
 * Init the polyfill only if runtime is missing
 */

window.chrome.runtime = {
  id: {},
  lastError: null,
  getManifest: () => ({version}),
  getURL:() => ""
};
