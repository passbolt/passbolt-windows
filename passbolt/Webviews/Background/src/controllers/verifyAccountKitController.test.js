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
import { pgpKeys } from "passbolt-browser-extension/test/fixtures/pgpKeys/keys";
import { defaultData } from "../services/verifyAccountKitService.test.data";

describe('VerifyAccountKitController', () => {
    let verifyAccountKitController;
    let worker;
    let accountKit;
    let requestId = uuidv4();
    const accountDto = defaultAccountDto();

    beforeEach(async () => {
        worker = { port: new IPCHandler() };
        verifyAccountKitController = new VerifyAccountKitController(worker, requestId);
        accountKit = await defaultData({
            message: JSON.stringify(accountDto), privateKey: pgpKeys.ada.private_decrypted
        });
    });
    describe('VerifyAccountKitController:exec', () => {
        it('Should return the validated account kit', async () => {
            expect.assertions(1);

            const result = await verifyAccountKitController.exec(accountKit);

            expect(result).toEqual(accountDto);
        })
        
        it('Should save account kit into the AuthImportStorageService and persist it', async () => {
            expect.assertions(1);

            jest.spyOn(AuthImportStorageService, "set")

            const expectedResult = new AuthImportEntity({account_kit: accountDto});
            await verifyAccountKitController.exec(accountKit);

            expect(AuthImportStorageService.set).toHaveBeenCalledWith(expectedResult);
        })
    });
})
