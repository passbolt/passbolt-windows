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
 * @since         2.3.0
 */


namespace passbolt.Models.Messaging.Topics
{
    public class ClipboardTopics
    {
        public const string CLIPBOARD_COPY_TEMPRORARILY_EVENT = "passbolt.clipboard.copy-temporarily";
        public const string CLIPBOARD_COPY_EVENT = "passbolt.clipboard.copy";
        public const string CLIPBOARD_CANCEL_FLUSH_EVENT = "passbolt.clipboard.cancel-content-flush";
    }
}
