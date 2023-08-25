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

import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";

export const legacyResult = {
  domain: defaultAccountDto().domain
}

export const passboltData = {
  "debug": false,
  "log": { "console": false, "level": 0 }, 
  "user.firstname": defaultAccountDto().first_name, 
  "user.id": defaultAccountDto().user_id, 
  "user.lastname": defaultAccountDto().last_name, 
  "user.settings.securityToken.code": defaultAccountDto().security_token.code, 
  "user.settings.securityToken.color": defaultAccountDto().security_token.color, 
  "user.settings.securityToken.textColor": defaultAccountDto().security_token.textcolor, 
  "user.settings.trustedDomain": defaultAccountDto().domain, 
  "user.username": defaultAccountDto().username
}


export const userConfig = {
  "config": {
    "user.firstname": defaultAccountDto().first_name, 
    "user.lastname": defaultAccountDto().last_name, 
    "user.username": defaultAccountDto().username,
    "user.settings.trustedDomain": defaultAccountDto().domain, 
    "user.settings.securityToken.code": "YUL",
    "user.settings.securityToken.color": "#FF9800",
    "user.settings.securityToken.textColor": "#000000",
    "user.settings.trustedDomain": "https://www.passbolt.local",
  }
}