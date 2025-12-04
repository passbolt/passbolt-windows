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
 * @since         2.6.0
 */

import FavoriteResourceController from "passbolt-browser-extension/src/all/background_page/controller/favorite/favoriteResourceController";
import UnfavoriteResourceController from "passbolt-browser-extension/src/all/background_page/controller/favorite/unfavoriteResourceController";

const listen = function(worker, apiClientOptions, account) {
  /**
   * Mark a resource as favorite
   *
   * @listens passbolt.favorite.add
   * @param requestId {uuid} The request identifier
   * @param resourceId {uuid} The resource id
   */
  worker.port.on('passbolt.favorite.add', async(requestId, resourceId) => {
    const controller = new FavoriteResourceController(worker, requestId, apiClientOptions, account);
    await controller._exec(resourceId);
  });
  /**
   * Unmark a resource as favorite
   *
   * @listens passbolt.favorite.delete
   * @param requestId {uuid} The request identifier
   * @param resourceId {uuid} The resource id
   */
  worker.port.on('passbolt.favorite.delete', async(requestId, resourceId) => {
    const controller = new UnfavoriteResourceController(worker, requestId, apiClientOptions, account);
    await controller._exec(resourceId);
  });
};

export const FavoriteEvents = {listen};
