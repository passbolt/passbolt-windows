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
 * @since         2.8.0
 */
import FindTagsController from "passbolt-browser-extension/src/all/background_page/controller/tag/findTagsController";
import UpdateTagController from "passbolt-browser-extension/src/all/background_page/controller/tag/updateTagController";
import DeleteTagController from "passbolt-browser-extension/src/all/background_page/controller/tag/deleteTagController";
import UpdateResourceTagsController from "passbolt-browser-extension/src/all/background_page/controller/tag/updateResourceTagsController";
import AddTagsToResourcesController from "passbolt-browser-extension/src/all/background_page/controller/tag/addTagsToResourcesController";

const listen = function(worker, apiClientOptions) {
  /**
   * Find all the tags
   *
   * @listens passbolt.tags.find-all
   * @param requestId {uuid} The request identifier
   */
  worker.port.on("passbolt.tags.find-all", async (requestId) => {
    const findTagsController = new FindTagsController(worker, requestId, apiClientOptions);
    await findTagsController._exec();
  });

  /**
   * Update a tag
   *
   * @listens passbolt.tags.update
   * @param requestId {uuid} The request identifier
   * @param tagDto {object} The tag object
   */
  worker.port.on("passbolt.tags.update", async (requestId, tagDto) => {
    const updateTagController = new UpdateTagController(worker, requestId, apiClientOptions);
    await updateTagController._exec(tagDto);
  });

  /**
   * Delete a tag
   *
   * @listens passbolt.tags.delete
   * @param requestId {uuid} The request identifier
   * @param tagId {uuid} The tag identifier
   */
  worker.port.on("passbolt.tags.delete", async (requestId, tagId) => {
    const deleteTagController = new DeleteTagController(worker, requestId, apiClientOptions);
    await deleteTagController._exec(tagId);
  });

  /**
   * Update resource tags
   *
   * @listens passbolt.tags.update-resource-tags
   * @param requestId {uuid} The request identifier
   * @param resourceId {uuid} The resource identifier
   * @param tagsDto {Object} tags dto
   */
  worker.port.on("passbolt.tags.update-resource-tags", async (requestId, resourceId, tagsDto) => {
    const updateResourceTagsController = new UpdateResourceTagsController(worker, requestId, apiClientOptions);
    await updateResourceTagsController._exec(resourceId, tagsDto);
  });

  /**
   * Add resources tag
   *
   * @listens passbolt.tags.add-resource-tags
   * @param requestId {uuid} The request identifier
   * @param {object} resourcesTagDto {resources: array of uuids, tag: {object}} the tag to add for the resources
   */
  worker.port.on("passbolt.tags.add-resources-tag", async (requestId, resourcesTagDto) => {
    const addTagsToResourcesController = new AddTagsToResourcesController(worker, requestId, apiClientOptions);
    await addTagsToResourcesController._exec(resourcesTagDto.resources, [resourcesTagDto.tag]);
  });
};

export const TagEvents = {listen};
