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

import FindLocaleService from "../services/locale/findLocaleService";

/**
 * Controller related to the locale of the desktop application.
 */
class GetLocaleDesktopController {
  /**
   * GetLocaleDesktopController constructor.
   * @param {Worker} worker
   * @param {string} requestId
   * @param {ApiClientOptions} apiClientOptions The api client options.
   */
  constructor(worker, requestId, apiClientOptions) {
    this.worker = worker;
    this.requestId = requestId;
    this.findLocaleService = new FindLocaleService(apiClientOptions);
  }

  /**
   * Wrapper of exec function to run.
   * @returns {Promise<void>}
   */
  async _exec() {
    try {
      const localeEntity = await this.exec();
      this.worker.port.emit(this.requestId, 'SUCCESS', localeEntity);
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Get the locale to apply and initialize the background page translations with it.
   * @returns {Promise<LocaleEntity>}
   */
  async exec() {
    const localeEntity = await this.findLocaleService.findLocale();
    await this.findLocaleService.initializeI18next(localeEntity);
    return localeEntity;
  }
}

export default GetLocaleDesktopController;
