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

/**
 * Polyfill to init a fake runtime to match with bext runtime requierement
 */
/**
 * Init the polyfill only if runtime is missing
 */
if (!window.chrome.runtime) {
    window.chrome.runtime = {
      id: {},
      lastError: null,
      getManifest: () => ({manifest_version: 0})
    };
}
  