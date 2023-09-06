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

import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import AuthImportEntity from "./authImportEntity";
import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
import AccountEntity from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity";

describe("AuthImportEntity", () => {
    describe("AuthImportEntity:constructor", () => {
      it("schema must validate", () => {
        EntitySchema.validateSchema(AuthImportEntity.ENTITY_NAME, AuthImportEntity.getSchema());
      });
  
      it("constructor works if valid minimal DTO is provided", () => {
        expect.assertions(1);

        const dto = defaultAccountDto();
        const entity = new AuthImportEntity({account_kit: dto});
        expect(entity.account_kit).toEqual(new AccountEntity(dto));
      });
  });
});