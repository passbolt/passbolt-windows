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
};

export const MetadataEvents = {listen};
