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

import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
import AuthImportStorageService from "../services/authImportStorageService";
import AuthImportEntity from "../entity/AuthImportEntity/authImportEntity";
import {Buffer} from "buffer";
import VerifyAccountKitService from "./verifyAccountKitService";
import { defaultData } from "./verifyAccountKitService.test.data";
import { pgpKeys } from "passbolt-browser-extension/test/fixtures/pgpKeys/keys";

describe('VerifyAccountKitService', () => {
    let verifyAccountKitService;

    beforeEach(async () => {
        verifyAccountKitService = new VerifyAccountKitService();
    });

    describe('VerifyAccountKitController:exec', () => {
        it('Should validate if the account kit is present', () => {
            expect.assertions(1);

            const result = verifyAccountKitService.verify();

            expect(result).rejects.toThrow("The account kit is required.");
        })
        
        it('Should validate if the account kit is base 64 format', () => {
            expect.assertions(1);

            const result = verifyAccountKitService.verify("Not a base64");

            expect(result).rejects.toThrow("The account kit should be a base 64 format.");
        })

        it('Should validate if the account kit is a string', () => {
            expect.assertions(1);

            const result = verifyAccountKitService.verify(3);

            expect(result).rejects.toThrow("The account kit should be a string.");
        })

        it('Should validate account which should be a valid open gpg message', async () => {
            expect.assertions(1);

            const result = verifyAccountKitService.verify("e30=");

            await expect(result).rejects.toThrow("The message should be a valid openpgp message.");
        })

        it('Should validate account kit with entity', async () => {
            expect.assertions(1);

            const wrongAccountKit = await defaultData({
                message: "{}"
            });
            const result = verifyAccountKitService.verify(wrongAccountKit);

            await expect(result).rejects.toThrow("Could not validate entity Account.");
        })

        it('Should return the validated account kit', async () => {
            expect.assertions(1);

            const accountDto = defaultAccountDto();
            const accountKit = await defaultData({message: JSON.stringify(accountDto), privateKey: pgpKeys.ada.private_decrypted});
            const result = await verifyAccountKitService.verify(accountKit);

            expect(result).toEqual(accountDto);
        })
    });
})
