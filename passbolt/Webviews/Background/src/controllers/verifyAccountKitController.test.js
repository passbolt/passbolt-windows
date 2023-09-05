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

import IPCHandler from "../shared/IPCHandler";
import {defaultAccountDto} from "passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.test.data";
import {v4 as uuidv4} from "uuid";
import VerifyAccountKitController from "./verifyAccountKitController";
import AuthImportStorageService from "../services/authImportStorageService";
import AuthImportEntity from "../entity/AuthImportEntity/authImportEntity";

describe('VerifyAccountKitController', () => {
    let verifyAccountKitController;
    let worker;
    let requestId = uuidv4();

    beforeEach(async () => {
        worker = { port: new IPCHandler() };
        verifyAccountKitController = new VerifyAccountKitController(worker, requestId);
    });
    describe('VerifyAccountKitController:exec', () => {
        it('Should validate if the account kit is present', async () => {
            expect.assertions(1);

            const result = verifyAccountKitController.exec();

            expect(result).rejects.toThrow("The account kit is required.");
        })
        
        it('Should validate if the account kit is base 64 format', async () => {
            expect.assertions(1);

            const result = verifyAccountKitController.exec("Not a base64");

            expect(result).rejects.toThrow("The account kit should be a base 64 format.");
        })

        it('Should validate if the account kit is a string', async () => {
            expect.assertions(1);

            const result = verifyAccountKitController.exec(3);

            expect(result).rejects.toThrow("The account kit should be a string.");
        })

        it('Should validate account kit with entity', async () => {
            expect.assertions(1);

            const result = verifyAccountKitController.exec("e30=");

            expect(result).rejects.toThrow("Could not validate entity Account.");
        })

        it('Should return the validated account kit', async () => {
            expect.assertions(1);

            const accountDto = defaultAccountDto();
            const accountDtoStringify = JSON.stringify(accountDto);
            const accountKit = Buffer.from(accountDtoStringify).toString('base64');
            const result = await verifyAccountKitController.exec(accountKit);

            expect(result).toEqual(accountDto);
        })
        
        it('Should save account kit into the AuthImportStorageService and persist it', async () => {
            expect.assertions(1);

            jest.spyOn(AuthImportStorageService, "set")

            const accountDto = defaultAccountDto();
            const expectedResult = new AuthImportEntity({account_kit: accountDto});
            const accountDtoStringify = JSON.stringify(accountDto);
            const accountKit = Buffer.from(accountDtoStringify).toString('base64');
            verifyAccountKitController.exec(accountKit);

            expect(AuthImportStorageService.set).toHaveBeenCalledWith(expectedResult);
        })
    });
})
