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
 * @since         0.0.3
 */

import ExportResourcesFileController from "../controllers/exportResourcesFilesController";
import User from "passbolt-browser-extension/src/all/background_page/model/user";

const listen = function(worker) {
  /*
   * Export resources to file
   *
   * @listens passbolt.export-resources.export-to-file
   * port-resources.export-to-file
   * @param requestId {uuid} The request identifier
   * @param exportResourcesFileDto {object} The export resources file DTO
   */
  worker.port.on('passbolt.export-resources.export-to-file', async(requestId, exportResourcesFileDto) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const exportController = new ExportResourcesFileController(worker, apiClientOptions, requestId);
    await exportController.exec(exportResourcesFileDto);
  });
};

export const ExportResourcesEvents = {listen};
