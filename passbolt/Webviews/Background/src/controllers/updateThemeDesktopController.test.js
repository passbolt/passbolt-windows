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
 * @since         2.16.0
 */

import {defaultApiClientOptions} from "passbolt-styleguide/src/shared/lib/apiClient/apiClientOptions.test.data";
import ChangeThemeEntity from "passbolt-browser-extension/src/all/background_page/model/entity/theme/change/ChangeThemeEntity";
import EntityValidationError from "passbolt-styleguide/src/shared/models/entity/abstract/entityValidationError";
import UpdateThemeDesktopController from "./updateThemeDesktopController";
import {UPDATE_THEME} from "../enumerations/appEventEnumeration";

describe("UpdateThemeDesktopController", () => {
  let controller, worker;
  const requestId = "request-id";
  const name = "midgar";

  beforeEach(() => {
    jest.clearAllMocks();
    worker = {port: {emit: jest.fn()}};
    controller = new UpdateThemeDesktopController(worker, requestId, defaultApiClientOptions());
    jest.spyOn(controller.updateThemeService, "update").mockImplementation(() => Promise.resolve());
  });

  describe("::exec", () => {
    it("Should update the theme and notify the native application", async() => {
      expect.assertions(2);

      await controller.exec(name);

      expect(controller.updateThemeService.update).toHaveBeenCalledWith(new ChangeThemeEntity({name}));
      expect(worker.port.emit).toHaveBeenCalledWith(UPDATE_THEME, name);
    });
  });

  describe("::_exec", () => {
    it("Should emit a success once the theme is updated", async() => {
      expect.assertions(2);

      await controller._exec(name);

      expect(worker.port.emit).toHaveBeenNthCalledWith(1, UPDATE_THEME, name);
      expect(worker.port.emit).toHaveBeenNthCalledWith(2, requestId, "SUCCESS");
    });

    it("Should emit an error and not notify the native application if the name is invalid", async() => {
      expect.assertions(3);
      jest.spyOn(console, "error").mockImplementation(() => {});

      await controller._exec("not a valid name!");

      expect(controller.updateThemeService.update).not.toHaveBeenCalled();
      expect(worker.port.emit).not.toHaveBeenCalledWith(UPDATE_THEME, expect.anything());
      expect(worker.port.emit).toHaveBeenCalledWith(requestId, "ERROR", expect.any(EntityValidationError));
    });

    it("Should emit an error and not notify the native application if the update fails", async() => {
      expect.assertions(2);
      const error = new Error("Unable to reach the server");
      jest.spyOn(console, "error").mockImplementation(() => {});
      controller.updateThemeService.update.mockImplementation(() => Promise.reject(error));

      await controller._exec(name);

      expect(worker.port.emit).not.toHaveBeenCalledWith(UPDATE_THEME, expect.anything());
      expect(worker.port.emit).toHaveBeenCalledWith(requestId, "ERROR", error);
    });
  });
});
