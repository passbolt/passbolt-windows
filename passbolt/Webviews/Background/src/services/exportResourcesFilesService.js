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

import i18n from "passbolt-browser-extension/src/all/background_page/sdk/i18n";
import ExportResourcesFileController from "passbolt-browser-extension/src/all/background_page/controller/export/exportResourcesFileController";
import ExportResourcesFileEntity from "passbolt-browser-extension/src/all/background_page/model/entity/export/exportResourcesFileEntity";
import ProgressService from "passbolt-browser-extension/src/all/background_page/service/progress/progressService";
import User from "passbolt-browser-extension/src/all/background_page/model/user";
import { DOWNLOAD_FILE } from "../enumerations/appEventEnumeration";
import FileService from "passbolt-browser-extension/src/all/background_page/service/file/fileService";

const INITIAL_PROGRESS_GOAL = 100;

/**
 * Service related to the export resources file service
 */
class ExportResourcesFileService {
  /**
   * constructor for the login user service
   * @param {ApiClientOptions} apiClientOptions 
   */
  constructor(worker, apiClientOptions) {
    this.worker = worker;
    this.exportResoucesFileController = new ExportResourcesFileController(worker, apiClientOptions);
    this.progressService = new ProgressService(this.worker, i18n.t("Exporting ..."));
  }

  /**
   * Main execution function.
   * @return {Promise}
   */
  async download(exportResourcesFileDto) {
    console.log(exportResourcesFileDto)
    const userId = User.getInstance()?.get().id;
    try {
      this.progressService.start(INITIAL_PROGRESS_GOAL, i18n.t("Generate file"));
      const exportEntity = new ExportResourcesFileEntity(exportResourcesFileDto);
      await this.exportResoucesFileController.prepareExportContent(exportEntity);
      const privateKey = await this.exportResoucesFileController.getPrivateKey();
      await this.exportResoucesFileController.decryptSecrets(exportEntity, userId, privateKey);
      await this.exportResoucesFileController.export(exportEntity);
      await this.generateBlob(exportEntity);
      await this.progressService.finishStep(i18n.t('Done'), true);
      await this.progressService.close();
    } catch (error) {
      await this.progressService.close();
      throw error;
    }
  }

  /**
   * Propose the file to download.
   * @param {ExportResourcesFileEntity} exportEntity The export entity
   * @returns {Promise<void>}
   */
  async generateBlob(exportEntity) {
    const date = new Date().toISOString().slice(0, 10);
    const filename = `passbolt-export-${date}.${exportEntity.fileType}`;
    const mimeType = this.exportResoucesFileController.getMimeType(exportEntity.fileType);

    const blobFile = new Blob([exportEntity.file], { type: mimeType });
    const dataUrl = await FileService.blobToDataURL(blobFile);
    window.chrome.webview.postMessage(JSON.stringify({ topic: DOWNLOAD_FILE, message: { content: dataUrl, filename } }));
  }
}

export default ExportResourcesFileService;