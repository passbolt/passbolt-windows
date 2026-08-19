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

import LocaleModel from "passbolt-browser-extension/src/all/background_page/model/locale/localeModel";
import LocaleEntity from "passbolt-browser-extension/src/all/background_page/model/entity/locale/localeEntity";
import LocalesCollection from "passbolt-browser-extension/src/all/background_page/model/entity/locale/localesCollection";
import FindSiteSettingsService from "passbolt-browser-extension/src/all/background_page/service/siteSettings/findSiteSettingsService";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import i18n from "passbolt-browser-extension/src/all/background_page/sdk/i18n";

/**
 * Service related to the locale of the desktop application.
 *
 * Desktop-specific implementation. The browser-extension `LocaleModel` reads the organization locale
 * through `GetOrFindSiteSettingsService`, which requires an `AccountEntity` and relies on the
 * authentication status check, `navigator.locks` and the offline-mode local storage. That machinery
 * is not available to the webviews, hence the `Parameter 'account' should be of type
 * AbstractAccountEntity.` error, and it does not resolve in the pre-authentication context. The
 * desktop only needs the public site settings, so we perform a plain API fetch — same rationale as
 * `siteSettingsEvents`.
 */
class FindLocaleService {
  /**
   * FindLocaleService constructor.
   * @param {ApiClientOptions} apiClientOptions The api client options.
   */
  constructor(apiClientOptions) {
    this.findSiteSettingsService = new FindSiteSettingsService(apiClientOptions);
    this.siteSettings = null;
  }

  /**
   * Find the locale to apply, following the priority:
   * 1. The locale of the user if set.
   * 2. The locale of the organization if set and supported.
   * 3. The default fallback locale.
   * @returns {Promise<LocaleEntity>}
   */
  async findLocale() {
    const userSettingsLocale = Config.read("user.settings.locale");
    if (userSettingsLocale) {
      return new LocaleEntity({locale: userSettingsLocale});
    }

    const siteSettings = await this.findSiteSettings();
    const supportedLocales = this.getSupportedLocales(siteSettings);
    const organizationLocale = supportedLocales.locales.find(supportedLocale => supportedLocale.locale === siteSettings.locale);
    return organizationLocale || LocaleModel.DEFAULT_LOCALE;
  }

  /**
   * Find the locales supported by the organization.
   * @returns {Promise<LocalesCollection>}
   */
  async findSupportedLocales() {
    const siteSettings = await this.findSiteSettings();
    return this.getSupportedLocales(siteSettings);
  }

  /**
   * Initialize the library i18next with the given locale and the organization supported locales.
   * @param {LocaleEntity} localeEntity The locale to use.
   * @returns {Promise<void>}
   */
  async initializeI18next(localeEntity) {
    const supportedLocales = await this.findSupportedLocales();
    const supportedLocalesId = supportedLocales.locales.map(supportedLocale => supportedLocale.locale);
    i18n.init(localeEntity.locale, supportedLocalesId);
  }

  /**
   * Find the organization site settings. The result is cached for the lifetime of the service, the
   * settings are requested by both the locale and the supported locales resolutions.
   * @returns {Promise<SiteSettingsEntity>}
   * @private
   */
  async findSiteSettings() {
    if (!this.siteSettings) {
      this.siteSettings = await this.findSiteSettingsService.findSiteSettings();
    }
    return this.siteSettings;
  }

  /**
   * Get the locales supported by the organization out of its site settings.
   * @param {SiteSettingsEntity} siteSettings The organization site settings.
   * @returns {LocalesCollection}
   * @private
   */
  getSupportedLocales(siteSettings) {
    if (!siteSettings.isPluginEnabled("locale")) {
      return LocaleModel.DEFAULT_SUPPORTED_LOCALES;
    }
    const localePluginSettings = siteSettings.getPluginSettings("locale");
    return new LocalesCollection(localePluginSettings.options || []);
  }
}

export default FindLocaleService;
