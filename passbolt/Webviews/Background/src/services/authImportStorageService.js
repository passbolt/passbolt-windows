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
 * @since         0.3.0
 */

import AuthImportEntity from "../entity/AuthImportEntity/authImportEntity";

class AuthImportStorageService {
    /**
    * Stores the account kit import in runtime memory.
    * @param {Object} accountKit
    * @return {AuthImportEntity}
    */
    static set(authImportEntity) {
        this.authImportEntity = authImportEntity
    }

    /**
     * Return the authImportEntity
     * @return {void}
     */
    static get() {
        return this.authImportEntity;
    }

    /**
     * Return the authImportEntity
     * @return {void}
     */
    static flush() {
        this.authImportEntity = null;
    }
}

export default AuthImportStorageService;