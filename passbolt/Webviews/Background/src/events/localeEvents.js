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
 * @since         0.5.0
 */
import User from "passbolt-browser-extension/src/all/background_page/model//user";
import LocaleModel from "passbolt-browser-extension/src/all/background_page/model/locale/localeModel";
import GetLocaleController from "passbolt-browser-extension/src/all/background_page/controller/locale/getLocaleController";
import LocaleEntity from "passbolt-browser-extension/src/all/background_page/model/entity/locale/localeEntity";
import {UPDATE_LOCALE} from "../enumerations/appEventEnumeration";


const listen = function(worker) {
  /*
   * Get locale language
   *
   * @listens passbolt.locale.get
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.locale.get', async requestId => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const getLocaleController = new GetLocaleController(worker, apiClientOptions);

    try {
      const localeEntity = await getLocaleController.getLocale();
      worker.port.emit(requestId, 'SUCCESS', localeEntity);
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Update the locale language
   *
   * @listens passbolt.locale.language.update
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.locale.update-user-locale', async(requestId, localeDto) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const localeModel = new LocaleModel(apiClientOptions);
    try {
      const localeToUpdateEntity = new LocaleEntity(localeDto);
      await localeModel.updateUserLocale(localeToUpdateEntity);
      worker.port.emit(UPDATE_LOCALE, localeToUpdateEntity.locale);
      worker.port.emit(requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });
};

export const LocaleEvents = {listen};
