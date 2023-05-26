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

import { accountDto } from "../data/mockStorage";

export const legacyResult = {
  domain: accountDto.domain
}

export const passboltData = {
  "debug": false,
  "log": { "console": false, "level": 0 }, 
  "user.firstname": accountDto.first_name, 
  "user.id": accountDto.user_id, 
  "user.lastname": accountDto.last_name, 
  "user.settings.securityToken.code": accountDto.security_token.code, 
  "user.settings.securityToken.color": accountDto.security_token.color, 
  "user.settings.securityToken.textColor": accountDto.security_token.textcolor, 
  "user.settings.trustedDomain": accountDto.domain, 
  "user.username": accountDto.username
}


export const userConfig = {
  "config": {
    "user.firstname": accountDto.first_name, 
    "user.lastname": accountDto.last_name, 
    "user.username": accountDto.username
  }
}