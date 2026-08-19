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

/**
 * Site settings with the locale plugin enabled.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const siteSettingsWithLocalePluginDto = (data = {}) => ({
  app: {
    url: "https://passbolt.local",
    locale: "fr-FR",
  },
  passbolt: {
    plugins: {
      locale: {
        enabled: true,
        options: [
          {locale: "en-UK", label: "English"},
          {locale: "fr-FR", label: "Français"},
        ],
      },
    },
  },
  ...data,
});

/**
 * Site settings without the locale plugin.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const siteSettingsWithoutLocalePluginDto = (data = {}) => ({
  app: {
    url: "https://passbolt.local",
    locale: "fr-FR",
  },
  ...data,
});
