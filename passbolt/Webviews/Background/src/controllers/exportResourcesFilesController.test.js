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

import {accountDto} from "../data/mockStorage";
import {resourceToExport} from "../services/exportResourcesFilesService.test.data";
import ExportResourcesFileDesktopController from "./exportResourcesFilesController";
import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('ExportResourcesFileDesktopController', () => {
  let exportResourcesFileDesktopController;

  beforeEach(() => {
    const worker = {
      port: {
        emit: jest.fn()
      }
    };
    exportResourcesFileDesktopController = new ExportResourcesFileDesktopController(worker, defaultApiClientOptions(), null, accountDto);
  });

  describe('ExportResourcesFileDesktopController:exec', () => {
    it('calls download and emits SUCCESS if no error occurs', async() => {
      jest.spyOn(exportResourcesFileDesktopController.exportResourcesFilesService, "download").mockImplementation(() => Promise.resolve());
      jest.spyOn(exportResourcesFileDesktopController.worker.port, "emit");
      await exportResourcesFileDesktopController.exec(resourceToExport);

      expect(exportResourcesFileDesktopController.exportResourcesFilesService.download).toHaveBeenCalledWith(resourceToExport);
      expect(exportResourcesFileDesktopController.worker.port.emit).toHaveBeenCalledWith(null, 'SUCCESS');
    });

    it('closes progressService and emits ERROR when an error occurs', async() => {
      const error = new Error('Test error');
      jest.spyOn(exportResourcesFileDesktopController.exportResourcesFilesService, "download").mockImplementation(() => {
        throw error;
      });

      await exportResourcesFileDesktopController.exec(resourceToExport);

      expect(exportResourcesFileDesktopController.worker.port.emit).toHaveBeenCalledWith(null, 'ERROR', error);
    });
  });
});

