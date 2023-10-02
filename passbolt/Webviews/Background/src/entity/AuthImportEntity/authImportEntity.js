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
import Entity from "passbolt-styleguide/src/shared/models/entity/abstract/entity";
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";

const ENTITY_NAME = "AuthImportEntity";

class AuthImportEntity extends Entity {
  /**
   * Setup entity constructor
   *
   * @param {Object} accountKit account kit
   * @param {Object} options.
   * @throws EntityValidationError if the dto cannot be converted into an entity
   */
  constructor(authImportEntity) {
    super(EntitySchema.validate(
      AuthImportEntity.ENTITY_NAME,
      authImportEntity,
      AuthImportEntity.getSchema()
    ));

    // Associations
    if (this._props.account_kit) {
      this.account_kit = new AccountEntity(this._props.account_kit);
      delete this._props.account_kit;
    }
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    const schema = {
      "type": "object",
      "required": [
        "account_kit",
      ],
      "properties": {
        account_kit: AccountEntity.getSchema(),
        "passphrase": {
          "type": "string",
        },
      },
    };

    return schema;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */

  /**
   * AuthImportEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default AuthImportEntity;

