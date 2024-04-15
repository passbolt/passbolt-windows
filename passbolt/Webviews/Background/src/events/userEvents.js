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

import User from "passbolt-browser-extension/src/all/background_page/model/user";
import UserModel from "passbolt-browser-extension/src/all/background_page/model/user/userModel";
import AccountModel from "passbolt-browser-extension/src/all/background_page/model/account/accountModel";
import UserDeleteTransferEntity from "passbolt-browser-extension/src/all/background_page/model/entity/user/transfer/userDeleteTransfer";
import UserEntity from "passbolt-browser-extension/src/all/background_page/model/entity/user/userEntity";
import SecurityTokenEntity from "passbolt-browser-extension/src/all/background_page/model/entity/securityToken/securityTokenEntity";
import AvatarUpdateEntity from "passbolt-browser-extension/src/all/background_page/model/entity/avatar/update/avatarUpdateEntity";
import UpdateUserLocalStorageController from "passbolt-browser-extension/src/all/background_page/controller/user/updateUserLocalStorageController";
import GetOrFindLoggedInUserController from "passbolt-browser-extension/src/all/background_page/controller/user/getOrFindLoggedInUserController";
import {UPDATE_SECURITY_TOKEN} from "../enumerations/appEventEnumeration";
import UpdatePrivateKeyController from "../controllers/updatePrivateKeyController";

const listen = function(worker, _, account) {
  /*
   * ==================================================================================
   *  Getters for user
   * ==================================================================================
   */
  /*
   * Get the users from the local storage.
   *
   * @listens passbolt.users.get-all
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.users.get-all', async requestId => {
    try {
      const apiClientOptions = await User.getInstance().getApiClientOptions();
      const userModel = new UserModel(apiClientOptions, account);
      const users = await userModel.getOrFindAll();
      worker.port.emit(requestId, 'SUCCESS', users);
    } catch (error) {
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * ==================================================================================
   *  CRUD
   * ==================================================================================
   */
  /*
   * Create a user user
   *
   * @listens passbolt.user.create
   * @param requestId {uuid} The request identifier
   * @param userDto {Object} The user object, example:
   *  {username: 'ada@passbolt.com', profile: {first_name: 'ada', last_name: 'lovelace'}, role_id: <UUID>}
   */
  worker.port.on('passbolt.users.create', async(requestId, userDto) => {
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();
      const userModel = new UserModel(clientOptions, account);
      const userEntity = new UserEntity(userDto);
      const updatedUser = await userModel.create(userEntity);
      worker.port.emit(requestId, 'SUCCESS', updatedUser);
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Create a user user
   *
   * @listens passbolt.users.find-logged-in-user
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.users.find-logged-in-user', async(requestId, refreshCache) => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new GetOrFindLoggedInUserController(worker, requestId, apiClientOptions, account);
    await controller._exec(refreshCache);
  });

  /*
   * Update a user
   * Can be used to change the role or firstname/lastname but nothing else
   *
   * @listens passbolt.user.update
   * @param requestId {uuid} The request identifier
   * @param userDato {Object} The user object, example:
   *  {id: <UUID>, username: 'ada@passbolt.com', profile: {first_name: 'ada', last_name: 'lovelace'}, role_id: <UUID>}
   */
  worker.port.on('passbolt.users.update', async(requestId, userDto) => {
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();
      const userModel = new UserModel(clientOptions, account);
      const userEntity = new UserEntity(userDto);
      const updatedUser = await userModel.update(userEntity, true);

      worker.port.emit(requestId, 'SUCCESS', updatedUser);
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Update a user avatar
   *
   * @listens passbolt.users.update-avatar
   * @param requestId {uuid} The request identifier
   * @param avatarBase64UpdateDto {object} The avatar dto
   *  {fileBase64: <string>, mimeType: <string>, filename: <string>}
   */
  worker.port.on('passbolt.users.update-avatar', async(requestId, userId, avatarBase64UpdateDto) => {
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();

      const userModel = new UserModel(clientOptions, account);
      const avatarUpdateEntity = AvatarUpdateEntity.createFromFileBase64(avatarBase64UpdateDto);

      const updatedUser = await userModel.updateAvatar(userId, avatarUpdateEntity, true);
      worker.port.emit(requestId, 'SUCCESS', updatedUser);
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Update a user avatar
   *
   * @listens passbolt.users.update-security-token
   * @param requestId {uuid} The request identifier
   * @param {{code: string, color: string, textColor: string}} securityTokenDto
   *
   */
  worker.port.on('passbolt.users.update-security-token', async(requestId, securityTokenDto) => {
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();
      const accountModel = new AccountModel(clientOptions, account);
      const securityTokenEntity = new SecurityTokenEntity(securityTokenDto);
      await accountModel.changeSecurityToken(securityTokenEntity);
      worker.port.emit(UPDATE_SECURITY_TOKEN, securityTokenEntity);
      worker.port.emit(requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Update the private key of the user and send the new recovery kit
   *
   * @listens passbolt.user.update-private-key
   * @param requestId {uuid} The request identifier
   * @param oldPassphrase {string} The old passphrase
   * @param newPassphrase {string} The new passphrase
   */
  worker.port.on('passbolt.user.update-private-key', async(requestId, oldPassphrase, newPassphrase) => {
    const controller = new UpdatePrivateKeyController(worker, requestId);
    await controller._exec(oldPassphrase, newPassphrase);
  });

  /*
   * Delete a user - dry run
   *
   * @param {string} requestId The request identifier uuid
   * @param {string} userId The user uuid
   */
  worker.port.on('passbolt.users.delete-dry-run', async(requestId, userId, transferDto) => {
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();
      const userModel = new UserModel(clientOptions, account);
      const transferEntity = transferDto ? new UserDeleteTransferEntity(transferDto) : null;
      await userModel.deleteDryRun(userId, transferEntity);
      worker.port.emit(requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * Delete a user
   *
   * @param {string} requestId The request identifier uuid
   * @param {string} userId The user uuid
   * @param {object} [transferDto] optional data ownership transfer
   */
  worker.port.on('passbolt.users.delete', async(requestId, userId, transferDto) => {
    try {
      const clientOptions = await User.getInstance().getApiClientOptions();
      const userModel = new UserModel(clientOptions, account);
      const transferEntity = transferDto ? new UserDeleteTransferEntity(transferDto) : null;
      await userModel.delete(userId, transferEntity);
      worker.port.emit(requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });

  /*
   * ==================================================================================
   *  Others
   * ==================================================================================
   */

  /*
   * Pull the users from the API and update the local storage.
   *
   * @listens passbolt.users.update-local-storage
   * @param {uuid} requestId The request identifier
   */
  worker.port.on('passbolt.users.update-local-storage', async requestId => {
    const apiClientOptions = await User.getInstance().getApiClientOptions();
    const controller = new UpdateUserLocalStorageController(worker, requestId, apiClientOptions, account);
    await controller._exec();
  });

  /*
   * Resend an invite to a user.
   *
   * @listens passbolt.users.resend-invite
   * @param {uuid} requestId The request identifier
   * @param {string} username The user username
   */
  worker.port.on('passbolt.users.resend-invite', async(requestId, username) => {
    try {
      const userModel = new UserModel(await User.getInstance().getApiClientOptions());
      await userModel.resendInvite(username);
      worker.port.emit(requestId, 'SUCCESS');
    } catch (error) {
      console.error(error);
      worker.port.emit(requestId, 'ERROR', error);
    }
  });
};

export const UserEvents = {listen};
