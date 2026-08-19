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
 * @since         2.12.0
 */

import {defaultApiClientOptions} from 'passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data';
import LocaleEntity from "passbolt-browser-extension/src/all/background_page/model/entity/locale/localeEntity";
import GetLocaleDesktopController from "./getLocaleDesktopController";

describe('GetLocaleDesktopController', () => {
  let getLocaleDesktopController, worker;
  const requestId = "request-id";

  beforeEach(() => {
    jest.clearAllMocks();
    worker = {port: {emit: jest.fn()}};
    getLocaleDesktopController = new GetLocaleDesktopController(worker, requestId, defaultApiClientOptions());
    jest.spyOn(getLocaleDesktopController.findLocaleService, "initializeI18next").mockImplementation(() => Promise.resolve());
  });

  describe('GetLocaleDesktopController:exec', () => {
    it('Should return the locale found and initialize the translations', async() => {
      expect.assertions(2);
      const localeEntity = new LocaleEntity({locale: "fr-FR", label: "Français"});
      jest.spyOn(getLocaleDesktopController.findLocaleService, "findLocale").mockImplementation(() => Promise.resolve(localeEntity));

      const locale = await getLocaleDesktopController.exec();

      expect(locale.locale).toEqual("fr-FR");
      expect(getLocaleDesktopController.findLocaleService.initializeI18next).toHaveBeenCalledWith(localeEntity);
    });
  });

  describe('GetLocaleDesktopController:_exec', () => {
    it('Should emit a success with the locale', async() => {
      expect.assertions(1);
      const localeEntity = new LocaleEntity({locale: "fr-FR", label: "Français"});
      jest.spyOn(getLocaleDesktopController.findLocaleService, "findLocale").mockImplementation(() => Promise.resolve(localeEntity));

      await getLocaleDesktopController._exec();

      expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'SUCCESS', localeEntity);
    });

    it('Should emit an error if the locale cannot be found', async() => {
      expect.assertions(1);
      const error = new Error("Unable to reach the server");
      jest.spyOn(getLocaleDesktopController.findLocaleService, "findLocale").mockImplementation(() => Promise.reject(error));
      jest.spyOn(console, "error").mockImplementation(() => {});

      await getLocaleDesktopController._exec();

      expect(worker.port.emit).toHaveBeenCalledWith(requestId, 'ERROR', error);
    });
  });
});
