/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.5.0
 */

import DownloadUserPublicKeyController from "./downloadUserPublicKeyController";
import FileService from "passbolt-browser-extension/src/all/background_page/service/file/fileService";
import GpgKeyError from "passbolt-browser-extension/src/all/background_page/error/GpgKeyError";
import MockExtension from "passbolt-browser-extension/test/mocks/mockExtension";
import {OpenpgpAssertion} from "passbolt-browser-extension/src/all/background_page/utils/openpgp/openpgpAssertions";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import {DOWNLOAD_FILE} from "../enumerations/appEventEnumeration";
import IPCHandler from "../shared/IPCHandler";

beforeEach(() => {
  jest.clearAllMocks();
});

const PUBLIC_KEY_FILENAME = "passbolt_public.asc";
const MIME_TYPE_TEXT_PLAIN = "text/plain";

describe("DownloadUserPublicKeyController", () => {
  let controller, worker, keyring;

  beforeEach(async() => {
    worker = {port: new IPCHandler()};
    controller = new DownloadUserPublicKeyController(worker, null);
    keyring = new Keyring();
  });

  it(`Should trigegr a file download with the public key`, async() => {
    expect.assertions(1);
    await MockExtension.withConfiguredAccount();
    jest.spyOn(worker.port, "emit").mockImplementation(() => jest.fn());

    //Generate blob file
    const privateArmoredKey = keyring.findPrivate().armoredKey;
    const privateKey = await OpenpgpAssertion.readKeyOrFail(privateArmoredKey);
    const publicKeyArmored = await privateKey.toPublic().armor();
    const blobFile = new Blob([publicKeyArmored], {type: MIME_TYPE_TEXT_PLAIN});
    const content = await FileService.blobToDataURL(blobFile);
    const filename = PUBLIC_KEY_FILENAME;

    await controller.exec();

    expect(worker.port.emit).toHaveBeenCalledWith(DOWNLOAD_FILE, {content, filename});
  });

  it(`Should throw an exception if the user's private key can't be found`, async() => {
    expect.assertions(2);
    MockExtension.withMissingPrivateKeyAccount();
    jest.spyOn(worker.port, "emit").mockImplementation(() => jest.fn());

    await expect(controller.exec()).rejects.toThrowError(new GpgKeyError("Public key can't be found."));
    expect(worker.port.emit).not.toHaveBeenCalled();
  });
});
