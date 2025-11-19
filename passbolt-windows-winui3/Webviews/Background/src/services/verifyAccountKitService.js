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
 * @since         0.4.0
 */

import Validator from "validator";
import VerifyMessageService from "passbolt-browser-extension/src/all/background_page/service/crypto/verifyMessageSign";
import AuthImportEntity from "../entity/AuthImportEntity/authImportEntity";
import {Buffer} from 'buffer';
import {OpenpgpAssertion} from "passbolt-browser-extension/src/all/background_page/utils/openpgp/openpgpAssertions";

/**
 * Service related to the verify account kit service
 */
class VerifyAccountKitService {
  /**
   * verify the account kit uploaded
   * @param {string} base64SignedAccountKit
   * @throws {Error} If the base64SignedAccountKit is missing
   * @throws {TypeError} If the base64SignedAccountKit is not a string
   * @throws {TypeError} If the base64SignedAccountKit is not a valid base64 message
   * @throws {TypeError} If the base64 message doesn't contain a valid gpg message
   * @throws {TypeError} If the message is not a valid json string
   * @throws {TypeError} If the json string is not a valid account kit entity
   * @throws {Error} If the account kit cannot be verified
   */
  async verify(base64SignedAccountKit) {
    if (!base64SignedAccountKit) {
      throw new Error("The account kit is required.");
    }
    if (typeof base64SignedAccountKit !== 'string') {
      throw new TypeError("The account kit should be a string.");
    }
    const trimedBase64 = base64SignedAccountKit.trim();
    if (!Validator.isBase64(trimedBase64)) {
      throw new TypeError("The account kit should be a base 64 format.");
    }
    const accountKitStringify = Buffer.from(trimedBase64, "base64").toString();
    //Read the armoredMessage
    const signedMessage = await OpenpgpAssertion.readClearMessageOrFail(accountKitStringify);
    //Extract message as text
    const accountKit = JSON.parse(signedMessage.getText());

    //Validate account throw the entity
    new AuthImportEntity({account_kit: accountKit});
    //Check pgp signature
    const verificationKeys = await OpenpgpAssertion.readAllKeysOrFail([accountKit["user_public_armored_key"]]);
    await VerifyMessageService.verifyClearMessage(signedMessage, verificationKeys);
    return accountKit;
  }
}

export default VerifyAccountKitService;
