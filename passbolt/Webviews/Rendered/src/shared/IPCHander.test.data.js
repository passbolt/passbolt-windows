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
 * @since         1.0.0
 */

export const topic = 'testEvent';

export const requestId = "f9409915-97a5-4c65-a126-ace5ec4a4339";

export const successTopic = {
  topic: topic,
  status: 'SUCCESS',
  message: 'success message'
};

export const errorTopic = {
  topic: topic,
  status: 'ERROR',
  message: 'error message'
};

export function buildMessage(topic, requestId) {
  const data = Object.assign({}, topic);
  data.requestId = requestId;
  return {data};
}
