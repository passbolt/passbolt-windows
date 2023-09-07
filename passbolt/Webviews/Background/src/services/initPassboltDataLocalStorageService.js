/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.0.1
 */

import AccountModel from "passbolt-browser-extension/src/all/background_page/model/account/accountModel";
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';


/**
 * Service related to the storage service
 */
class InitPassboltDataLocalStorageService {
    /**
     * init the passbolt configuration storage
     */
    async initPassboltData(accountData) {
        try {
            // The local storage needs to be initialized with an empty object prior adding account into it
            // Should be moved to the accountModel
            localStorage.setItem("_passbolt_data", JSON.stringify({}))
            const accountModel = new AccountModel();
            await accountModel.add(accountData);
        } catch (error) {
            console.error(error)
        }
        await LocalStorage.init();
    }
}

export default InitPassboltDataLocalStorageService;
