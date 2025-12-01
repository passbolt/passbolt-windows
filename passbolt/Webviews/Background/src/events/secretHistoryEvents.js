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
 * @since         2.6.0
 */

import FindSecretRevisionsSettingsController from "passbolt-browser-extension/src/all/background_page/controller/secretRevision/findSecretRevisionsSettingsController";
import FindResourceSecretRevisionsForDisplayController from "passbolt-browser-extension/src/all/background_page/controller/secretRevision/findResourceSecretRevisionsForDisplayController";
import DeleteSecretRevisionsSettingsController from "passbolt-browser-extension/src/all/background_page/controller/secretRevision/deleteSecretRevisionsSettingsController";
import SaveSecretRevisionsSettingsController from "passbolt-browser-extension/src/all/background_page/controller/secretRevision/saveSecretRevisionsSettingsController";

const listen = function(worker, apiClientOptions, account) {

  /**
   * Finds the secret revisions settings from the API
   *
   * @listens passbolt.secret-revisions.find-settings
   * @param requestId {uuid} The request identifier
   */
  worker.port.on('passbolt.secret-revisions.find-settings', async requestId => {
    console.log("called")
    const controller = new FindSecretRevisionsSettingsController(worker, requestId, apiClientOptions);
    await controller._exec();
  });

  /**
   * Saves the secret revisions settings to the API
   *
   * @listens passbolt.secret-revisions.save-settings
   * @param requestId {uuid} The request identifier
   * @param secretRevisionSettingsDto {Object} The secret revisions settings dto
   */
  worker.port.on('passbolt.secret-revisions.save-settings', async(requestId, secretRevisionSettingsDto) => {
    const controller = new SaveSecretRevisionsSettingsController(worker, requestId, apiClientOptions);
    await controller._exec(secretRevisionSettingsDto);
  });

  /**
   * Deletes the secret revisions settings from the API
   *
   * @listens passbolt.secret-revisions.delete-settings
   * @param requestId {uuid} The request identifier
   * @param settingsId {uuid} The settings id
   */
  worker.port.on('passbolt.secret-revisions.delete-settings', async requestId => {
    const controller = new DeleteSecretRevisionsSettingsController(worker, requestId, apiClientOptions);
    await controller._exec();
  });

  /**
   * Find the secret revisions of a resource given its id
   *
   * @listens passbolt.secret-revisions.find-all-by-resource-id-for-display
   * @param requestId {uuid} The request identifier
   * @param resourceId {uuid} The resource id
   */
  worker.port.on('passbolt.secret-revisions.find-all-by-resource-id-for-display', async(requestId, resourceId) => {
    const controller = new FindResourceSecretRevisionsForDisplayController(worker, requestId, apiClientOptions, account);
    await controller._exec(resourceId);
  });
};

export const SecretHistoryEvents = {listen};