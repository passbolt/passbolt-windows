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
 * @since         0.3.0
 */

import User from "passbolt-browser-extension/src/all/background_page/model/user";
import ExportResourcesFileService from "./exportResourcesFilesService";
import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';
import {resourceToExport} from "./exportResourcesFilesService.test.data";
import FileService from "passbolt-browser-extension/src/all/background_page/service/file/fileService";
import ExportResourcesFileEntity from "passbolt-browser-extension/src/all/background_page/model/entity/export/exportResourcesFileEntity";
import {DOWNLOAD_FILE} from "../enumerations/appEventEnumeration";
import {accountDto} from "../data/mockStorage";
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";

// Reset the modules before each test.
beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('ExportResourcesFileService', () => {
  let exportResourcesFileService, exportEntity;

  beforeEach(async() => {
    exportResourcesFileService = new ExportResourcesFileService(null, defaultApiClientOptions(), new AccountEntity(accountDto));
    exportEntity = new ExportResourcesFileEntity(resourceToExport);
    jest.spyOn(User, "getInstance").mockImplementation(() => ({get: () => ({id: 1})}));
    jest.spyOn(exportResourcesFileService.progressService, "start").mockImplementation(() => {});
    jest.spyOn(exportResourcesFileService.progressService, "finishStep").mockImplementation(() => Promise.resolve());
    jest.spyOn(exportResourcesFileService.progressService, "close").mockImplementation(() => Promise.resolve());
    jest.spyOn(exportResourcesFileService.exportResourcesService, "prepareExportContent").mockImplementation(() => {});
    jest.spyOn(exportResourcesFileService.exportResourcesService, "exportToFile").mockImplementation(() => {});
    jest.spyOn(FileService, "blobToDataURL").mockImplementation(() => {});
  });
  describe('ExportResourcesFileService:Download', () => {
    it('should start progress dialog', async() => {
      expect.assertions(1);
      await exportResourcesFileService.download(resourceToExport);
      expect(exportResourcesFileService.progressService.start).toHaveBeenCalledWith(100, "Generate file");
    });
    it('should close progress dialog', async() => {
      expect.assertions(2);
      await exportResourcesFileService.download(resourceToExport);
      expect(exportResourcesFileService.progressService.finishStep).toHaveBeenCalledWith("Done", true);
      expect(exportResourcesFileService.progressService.close).toHaveBeenCalledTimes(1);
    });
    it('should export data by using exportResoucesFileController from bext', async() => {
      expect.assertions(4);
      await exportResourcesFileService.download(resourceToExport);
      expect(exportResourcesFileService.exportResourcesService.prepareExportContent).toHaveBeenCalledWith(exportEntity);
      expect(exportResourcesFileService.exportResourcesService.prepareExportContent).toHaveBeenCalledTimes(1);
      expect(exportResourcesFileService.exportResourcesService.exportToFile).toHaveBeenCalledWith(exportEntity, null);
      expect(exportResourcesFileService.exportResourcesService.exportToFile).toHaveBeenCalledTimes(1);
    });
  });
  describe('ExportResourcesFileService:generateBlob', () => {
    it('should generateBlob and send message to main process', async() => {
      expect.assertions(2);
      const date = new Date().toISOString().slice(0, 10);
      const filename = `passbolt-export-${date}.csv`;

      await exportResourcesFileService.generateBlob(exportEntity);

      expect(FileService.blobToDataURL).toHaveBeenCalled();
      expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(`{\"topic\":\"${DOWNLOAD_FILE}\",\"message\":{\"filename\":\"${filename}\"}}`);
    });
  });
});
