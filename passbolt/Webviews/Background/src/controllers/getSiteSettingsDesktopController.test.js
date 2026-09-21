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
 * @since         2.13.0
 */

import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';
import GetSiteSettingsDesktopController from "./getSiteSettingsDesktopController";

describe('GetSiteSettingsDesktopController', () => {
  let getSiteSettingsDesktopController, worker;
  const requestId = "request-id";
  const siteSettings = {app: {url: "https://localhost"}};

  beforeEach(() => {
    jest.clearAllMocks();
    worker = {port: {emit: jest.fn()}};
    getSiteSettingsDesktopController = new GetSiteSettingsDesktopController(worker, requestId, defaultApiClientOptions());
  });

  describe('GetSiteSettingsDesktopController:exec', () => {
    it('Should return the site settings found', async() => {
      expect.assertions(1);
      jest.spyOn(getSiteSettingsDesktopController.findSiteSettingsService, "findSiteSettings").mockImplementation(() => Promise.resolve(siteSettings));

      const result = await getSiteSettingsDesktopController.exec();

      expect(result).toEqual(siteSettings);
    });
  });

  describe('GetSiteSettingsDesktopController:_exec', () => {
    it('Should emit a success with the site settings', async() => {
      expect.assertions(1);
      jest.spyOn(getSiteSettingsDesktopController.findSiteSettingsService, "findSiteSettings").mockImplementation(() => Promise.resolve(siteSettings));

      await getSiteSettingsDesktopController._exec();

      expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'SUCCESS', siteSettings);
    });

    it('Should emit an error if the site settings cannot be found', async() => {
      expect.assertions(1);
      const error = new Error("Unable to reach the server");
      jest.spyOn(getSiteSettingsDesktopController.findSiteSettingsService, "findSiteSettings").mockImplementation(() => Promise.reject(error));
      jest.spyOn(console, "error").mockImplementation(() => {});

      await getSiteSettingsDesktopController._exec();

      expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'ERROR', error);
    });
  });
});
