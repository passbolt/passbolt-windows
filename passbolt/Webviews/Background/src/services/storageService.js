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
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import { accountDto } from "../data/mockStorage";
import LocalStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage';


/**
 * Service related to the storage service
 */
class StorageService {

    /**
     * init the passbolt configuration storage
     */
    async initPassboltData() {
        if (localStorage.getItem('_passbolt_data') === null) {
            try {
                localStorage.setItem("_passbolt_data", JSON.stringify({}))
                const accountModel = new AccountModel();
                const account = new AccountEntity(accountDto);

                await accountModel.add(account);
            } catch (error) {
                console.error(error)
            }
        }
        await LocalStorage.init();
    }
}

export default StorageService;
