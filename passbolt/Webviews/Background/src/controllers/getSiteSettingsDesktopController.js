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

import FindSiteSettingsService from "passbolt-browser-extension/src/all/background_page/service/siteSettings/findSiteSettingsService";

/**
 * Controller related to the site settings of the desktop application.
 *
 * Desktop-specific implementation. The browser-extension controllers route through
 * `GetOrFindSiteSettingsService`/`FindAndUpdateSiteSettingsLocalStorageService`, which rely on
 * `navigator.locks`, an authentication status check and the offline-mode local storage. That
 * machinery never resolves in the WebView2 pre-authentication context and leaves the login screen
 * hanging on a black screen. The desktop only needs the public site settings, so we perform a plain
 * API fetch — mirroring the behaviour of the pre-5.14 `passbolt.organization-settings.get` event.
 */
class GetSiteSettingsDesktopController {
  /**
   * GetSiteSettingsDesktopController constructor.
   * @param {Worker} worker
   * @param {string} requestId
   * @param {ApiClientOptions} apiClientOptions The api client options.
   */
  constructor(worker, requestId, apiClientOptions) {
    this.worker = worker;
    this.requestId = requestId;
    this.findSiteSettingsService = new FindSiteSettingsService(apiClientOptions);
  }

  /**
   * Wrapper of exec function to run.
   * @returns {Promise<void>}
   */
  async _exec() {
    try {
      const siteSettings = await this.exec();
      this.worker.port.emit(this.requestId, 'SUCCESS', siteSettings);
    } catch (error) {
      console.error(error);
      this.worker.port.emit(this.requestId, 'ERROR', error);
    }
  }

  /**
   * Fetch the public site settings from the API.
   * @returns {Promise<Object>}
   */
  async exec() {
    return this.findSiteSettingsService.findSiteSettings();
  }
}

export default GetSiteSettingsDesktopController;
