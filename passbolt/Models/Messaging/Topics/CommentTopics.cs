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
* @since         0.0.1
 */

namespace passbolt.Models.Messaging.Topics
{
    public class CommentTopics
    {
        public const string FIND_ALL_BY_RESSOURCE = "passbolt.comments.find-all-by-resource";
        public const string CREATE = "passbolt.comments.create";
        public const string DELETE = "passbolt.comments.delete";
    }
}
