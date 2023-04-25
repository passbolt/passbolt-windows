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

using System.Collections.Generic;

namespace passbolt.Models.Messaging
{
    public class AllowedTopics
    {
        public const string DESKTOPAUTHENTICATE = "passbolt.desktop.authenticate";
        public const string AFTERLOGIN = "passbolt.auth.after-login";
        public const string ERROR = "passbolt.error";

        /// <summary>
        /// Retrieve all allowed topics
        /// </summary>
        /// <returns></returns>
        private static List<string> GetAllTopicNames()
        {
            return new List<string> { DESKTOPAUTHENTICATE, AFTERLOGIN };
        }

        /// <summary>
        /// Check if topic exist
        /// </summary>
        /// <returns></returns>
        public static bool IsTopicNameAllowed(string topicName)
        {
            return GetAllTopicNames().Contains(topicName);
        }
    }
}
