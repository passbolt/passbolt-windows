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
import SiteSettingsEntity from "passbolt-styleguide/src/shared/models/entity/siteSettings/siteSettingsEntity";
import LocaleModel from "passbolt-browser-extension/src/all/background_page/model/locale/localeModel";
import {Config} from "passbolt-browser-extension/src/all/background_page/model/config";
import i18n from "passbolt-browser-extension/src/all/background_page/sdk/i18n";
import FindLocaleService from "./findLocaleService";
import {siteSettingsWithLocalePluginDto, siteSettingsWithoutLocalePluginDto} from "./findLocaleService.test.data";

describe('FindLocaleService', () => {
  let findLocaleService;

  beforeEach(() => {
    jest.clearAllMocks();
    findLocaleService = new FindLocaleService(defaultApiClientOptions());
    jest.spyOn(Config, "read").mockImplementation(() => undefined);
  });

  const mockSiteSettings = dto => jest.spyOn(findLocaleService.findSiteSettingsService, "findSiteSettings")
    .mockImplementation(() => Promise.resolve(new SiteSettingsEntity(dto)));

  describe('FindLocaleService:findLocale', () => {
    it('Should return the user locale if any', async() => {
      expect.assertions(2);
      mockSiteSettings(siteSettingsWithLocalePluginDto());
      jest.spyOn(Config, "read").mockImplementation(() => "en-UK");

      const locale = await findLocaleService.findLocale();

      expect(locale.locale).toEqual("en-UK");
      expect(findLocaleService.findSiteSettingsService.findSiteSettings).not.toHaveBeenCalled();
    });

    it('Should return the organization locale if supported and the user has none', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithLocalePluginDto());

      const locale = await findLocaleService.findLocale();

      expect(locale.locale).toEqual("fr-FR");
    });

    it('Should return the default locale if the organization locale is not supported', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithLocalePluginDto({app: {url: "https://passbolt.local", locale: "de-DE"}}));

      const locale = await findLocaleService.findLocale();

      expect(locale.locale).toEqual(LocaleModel.DEFAULT_LOCALE.locale);
    });

    it('Should return the default locale if the locale plugin is disabled', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithoutLocalePluginDto());

      const locale = await findLocaleService.findLocale();

      expect(locale.locale).toEqual(LocaleModel.DEFAULT_LOCALE.locale);
    });

    it('Should throw if the site settings cannot be retrieved', async() => {
      expect.assertions(1);
      jest.spyOn(findLocaleService.findSiteSettingsService, "findSiteSettings")
        .mockImplementation(() => Promise.reject(new Error("Unable to reach the server")));

      await expect(findLocaleService.findLocale()).rejects.toThrow("Unable to reach the server");
    });
  });

  describe('FindLocaleService:findSupportedLocales', () => {
    it('Should return the organization supported locales', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithLocalePluginDto());

      const supportedLocales = await findLocaleService.findSupportedLocales();

      expect(supportedLocales.locales.map(locale => locale.locale)).toEqual(["en-UK", "fr-FR"]);
    });

    it('Should return the default supported locales if the locale plugin is disabled', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithoutLocalePluginDto());

      const supportedLocales = await findLocaleService.findSupportedLocales();

      expect(supportedLocales.locales.map(locale => locale.locale)).toEqual([LocaleModel.DEFAULT_LOCALE.locale]);
    });

    it('Should request the site settings only once', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithLocalePluginDto());

      await findLocaleService.findLocale();
      await findLocaleService.findSupportedLocales();

      expect(findLocaleService.findSiteSettingsService.findSiteSettings).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindLocaleService:initializeI18next', () => {
    it('Should initialize i18next with the locale and the organization supported locales', async() => {
      expect.assertions(1);
      mockSiteSettings(siteSettingsWithLocalePluginDto());
      jest.spyOn(i18n, "init").mockImplementation(() => {});

      const locale = await findLocaleService.findLocale();
      await findLocaleService.initializeI18next(locale);

      expect(i18n.init).toHaveBeenCalledWith("fr-FR", ["en-UK", "fr-FR"]);
    });
  });
});
