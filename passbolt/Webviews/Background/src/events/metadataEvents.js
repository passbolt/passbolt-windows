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
 * @since         1.4.0
 */

import GetOrFindMetadataTypesController from "passbolt-browser-extension/src/all/background_page/controller/metadata/getMetadataTypesSettingsController";
import ShareMetadataKeyPrivateController from "passbolt-browser-extension/src/all/background_page/controller/metadata/shareMetadataKeyPrivateController";
import GetOrFindMetadataKeysSettingsController from "passbolt-browser-extension/src/all/background_page/controller/metadata/getOrFindMetadataKeysSettingsController";

const listen = function(worker, apiClientOptions, account) {
  /*
   * Get or find metadata types settings.
   *
   * @listens passbolt.metadata.get-or-find-metadata-types-settings
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.metadata.get-or-find-metadata-types-settings', async requestId => {
    const controller = new GetOrFindMetadataTypesController(worker, requestId, apiClientOptions, account);
    await controller._exec();
  });

  /*
   * Share missing metadata private key with a user.
   *
   * @listens passbolt.metadata.share-missing-metadata-private-keys-with-user
   * @param requestId {uuid} The request identifier
   * @param userId {uuid} the user id which missed some metadata private key.
   */
  worker.port.on('passbolt.metadata.share-missing-metadata-private-keys-with-user', async(requestId, userId) => {
    const controller = new ShareMetadataKeyPrivateController(worker, requestId, apiClientOptions, account);
    await controller._exec(userId);
  });

  /*
   * Get or find metadata keys settings.
   *
   * @listens passbolt.metadata.get-or-find-metadata-keys-settings
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.metadata.get-or-find-metadata-keys-settings', async requestId => {
    const controller = new GetOrFindMetadataKeysSettingsController(worker, requestId, apiClientOptions, account);
    await controller._exec();
  });

};

export const MetadataEvents = {listen};
