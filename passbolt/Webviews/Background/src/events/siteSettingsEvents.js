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
 * @since         2.11.0
 */
import FindSiteSettingsService from "passbolt-browser-extension/src/all/background_page/service/siteSettings/findSiteSettingsService";

/**
 * Listen to the site settings events.
 *
 * Desktop-specific implementation. The browser-extension `SiteSettingsEvents` routes through
 * `GetOrFindSiteSettingsService.getOrFind`, which relies on `navigator.locks`, an authentication
 * status check and the offline-mode local storage. That machinery never resolves in the WebView2
 * pre-authentication context and leaves the login screen hanging on a black screen. The desktop only
 * needs the public site settings, so we perform a plain API fetch — mirroring the behaviour of the
 * pre-5.14 `passbolt.organization-settings.get` event.
 */
const listen = function(worker, apiClientOptions) {
  /**
   * Get the site settings.
   *
   * @listens passbolt.site-settings.get-or-find
   * @param requestId {uuid} The request identifier
   */
  worker.port.on("passbolt.site-settings.get-or-find", async requestId => {
    try {
      const findSiteSettingsService = new FindSiteSettingsService(apiClientOptions);
      const siteSettings = await findSiteSettingsService.findSiteSettings();
      worker.port.emit(requestId, "SUCCESS", siteSettings);
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, "ERROR", error);
    }
  });
};

export const SiteSettingsEvents = {listen};
