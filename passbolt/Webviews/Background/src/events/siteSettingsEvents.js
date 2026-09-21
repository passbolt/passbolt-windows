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
import GetSiteSettingsDesktopController from "../controllers/getSiteSettingsDesktopController";

/**
 * Listen to the site settings events.
 *
 * Desktop-specific implementation. The browser-extension `SiteSettingsEvents` routes through
 * `GetOrFindSiteSettingsService.getOrFind`, which relies on `navigator.locks`, an authentication
 * status check and the offline-mode local storage. That machinery never resolves in the WebView2
 * pre-authentication context and leaves the login screen hanging on a black screen. The desktop only
 * needs the public site settings, so `GetSiteSettingsDesktopController` performs a plain API fetch —
 * mirroring the behaviour of the pre-5.14 `passbolt.organization-settings.get` event.
 *
 * Since 5.16 the browser-extension exposes two events routing through the same offline-aware machinery:
 * `passbolt.site-settings.get-or-find` (still requested directly by the desktop login screen, see
 * `AppAuthentication.js`) and `passbolt.site-settings.find-and-update` (requested by the authenticated
 * workspace bootstrap `ExtAppContext`). Both are handled here with the same plain API fetch so the
 * desktop never falls into the WebView2-incompatible `navigator.locks`/local-storage code path.
 */
const listen = function(worker, apiClientOptions) {
  /**
   * Get the site settings.
   *
   * @listens passbolt.site-settings.get-or-find
   * @param requestId {uuid} The request identifier
   */
  worker.port.on("passbolt.site-settings.get-or-find", async requestId => {
    const controller = new GetSiteSettingsDesktopController(worker, requestId, apiClientOptions);
    await controller._exec();
  });

  /**
   * Retrieve the site settings and update the caches.
   *
   * @listens passbolt.site-settings.find-and-update
   * @param requestId {uuid} The request identifier
   */
  worker.port.on("passbolt.site-settings.find-and-update", async requestId => {
    const controller = new GetSiteSettingsDesktopController(worker, requestId, apiClientOptions);
    await controller._exec();
  });
};

export const SiteSettingsEvents = {listen};
