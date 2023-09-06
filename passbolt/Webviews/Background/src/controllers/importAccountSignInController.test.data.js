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

import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";
import { defaultAccountDto } from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";

export function authImportDefault(data = {}) {
    const authImport = {
        account_kit: new AccountEntity(defaultAccountDto()),
        passphrase: "ada@passbolt.com"
    }
    return Object.assign(authImport, data);
}

export function passboltDataConfig(data = {}) {
    const config = {
        "user.id": defaultAccountDto().user_id,
        "user.firstname": defaultAccountDto().first_name,
        "user.lastname": defaultAccountDto().last_name,
        "user.settings.trustedDomain": defaultAccountDto().domain,
        "user.username": defaultAccountDto().username,
        "user.settings.securityToken.code": defaultAccountDto().security_token.code,
        "user.settings.securityToken.color": defaultAccountDto().security_token.color,
        "user.settings.securityToken.textColor": defaultAccountDto().security_token.textcolor,
    }
    
    return Object.assign(config, data);
}
