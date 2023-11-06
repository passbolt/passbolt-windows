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

import DownloadUserPrivateKeyController from "./downloadUserPrivateKeyController";
import GpgKeyError from "passbolt-browser-extension/src/all/background_page/error/GpgKeyError";
import MockExtension from "passbolt-browser-extension/test/mocks/mockExtension";
import FileService from "passbolt-browser-extension/src/all/background_page/service/file/fileService";
import Keyring from "passbolt-browser-extension/src/all/background_page/model/keyring";
import {DOWNLOAD_FILE} from "../enumerations/appEventEnumeration";
import IPCHandler from "../shared/IPCHandler";

jest.mock("passbolt-browser-extension/src/all/background_page/service/passphrase/getPassphraseService");

beforeEach(() => {
  jest.clearAllMocks();
});

const PRIVATE_KEY_FILENAME = "passbolt_private.asc";
const MIME_TYPE_TEXT_PLAIN = "text/plain";

describe("DownloadUserPrivateKeyController", () => {
  let controller, worker, keyring;

  beforeEach(async() => {
    worker = {port: new IPCHandler()};
    controller = new DownloadUserPrivateKeyController(worker, null);
    keyring = new Keyring();
  });

  it(`Should trigger a file download with the private key`, async() => {
    expect.assertions(2);
    await MockExtension.withConfiguredAccount();
    controller.getPassphraseService.requestPassphrase.mockResolvedValue("");
    jest.spyOn(worker.port, "emit").mockImplementation(() => jest.fn());

    //Generate blob file
    const privateKey = keyring.findPrivate().armoredKey;
    const blobFile = new Blob([privateKey], {type: MIME_TYPE_TEXT_PLAIN});
    const content = await FileService.blobToDataURL(blobFile);

    await controller.exec();

    expect(worker.port.emit).toHaveBeenCalledWith(DOWNLOAD_FILE, {content, filename: PRIVATE_KEY_FILENAME});
    expect(controller.getPassphraseService.requestPassphrase).toHaveBeenCalledTimes(1);
  });

  it(`Should throw an exception if the user's private key can't be find`, async() => {
    expect.assertions(3);
    MockExtension.withMissingPrivateKeyAccount();
    controller.getPassphraseService.requestPassphrase.mockResolvedValue("");
    jest.spyOn(worker.port, "emit").mockImplementation(() => jest.fn());

    await expect(controller.exec()).rejects.toThrowError(new GpgKeyError("Private key not found."));
    expect(worker.port.emit).not.toHaveBeenCalled();
    expect(controller.getPassphraseService.requestPassphrase).toHaveBeenCalledTimes(1);
  });
});
