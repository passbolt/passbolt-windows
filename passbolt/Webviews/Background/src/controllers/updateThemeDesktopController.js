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

import UpdateThemeService from "passbolt-browser-extension/src/all/background_page/service/theme/updateThemeService";
import ChangeThemeEntity from "passbolt-browser-extension/src/all/background_page/model/entity/theme/change/ChangeThemeEntity";
import {UPDATE_THEME} from "../enumerations/appEventEnumeration";

/**
 * Controller related to the update of the user theme on the desktop application.
 * Same as the browser extension UpdateThemeController, but it also notifies the native application of the new theme.
 */
class UpdateThemeDesktopController {
  /**
   * UpdateThemeDesktopController constructor.
   * @param {Worker} worker
   * @param {string} requestId
   * @param {ApiClientOptions} apiClientOptions The api client options.
   */
  constructor(worker, requestId, apiClientOptions) {
    this.worker = worker;
    this.requestId = requestId;
    this.updateThemeService = new UpdateThemeService(apiClientOptions);
  }

  /**
   * Wrapper of exec function to run.
   * @returns {Promise<void>}
   */
  async _exec() {
    try {
      await this.exec.apply(this, arguments);
      this.worker.port.emit(this.requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Update the current user theme and notify the native application.
   * @param {string} name The theme name to apply
   * @returns {Promise<void>}
   * @throws {EntityValidationError} If the name is not a valid theme name
   */
  async exec(name) {
    const changeThemeEntity = new ChangeThemeEntity({name});
    await this.updateThemeService.update(changeThemeEntity);
    this.worker.port.emit(UPDATE_THEME, name);
  }
}

export default UpdateThemeDesktopController;
