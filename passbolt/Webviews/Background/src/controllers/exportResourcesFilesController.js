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

import ExportResourcesFileService from "../services/exportResourcesFilesService";

class ExportResourcesFileDesktopController { 
  /**
   * ExportResourcesFileController constructor
   * @param {Worker} worker
   * @param {ApiClientOptions} clientOptions
   */
  constructor(worker, clientOptions, requestId) {
    this.worker = worker;
    this.requestId = requestId;
    this.exportResourcesFilesService = new ExportResourcesFileService(worker, clientOptions);
  }

  /**
   * Main execution function.
   * @return {Promise}
   */
  async exec(exportResourcesFileDto) {
    try {
      await this.exportResourcesFilesService.download(exportResourcesFileDto);
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    } 
  }
}

export default ExportResourcesFileDesktopController;
