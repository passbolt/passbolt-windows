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
 * @since         0.0.1
 */

using System.Collections.Generic;
using passbolt.Models.Messaging.Topics;
using passbolt.Utils;

namespace passbolt.Models.Messaging
{
    public class AllowedTopics
    {
        public const string ERROR = "passbolt.error";
        public const string BACKGROUND_READY = "passbolt.background.is-ready";
        private static List<string> topics = new List<string>() { BACKGROUND_READY, ERROR };
        private static List<string> requestIds = new List<string>();

        /// <summary>
        /// static constructor for AllowedTopics
        /// </summary>
        static AllowedTopics()
        {
            InitTopics();
        }

        /// <summary>
        /// init topics list with all topics
        /// </summary>
        private static void InitTopics()
        {
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AuthenticationTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ActionLogsTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(CommentTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(FolderTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(GroupTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(LocaleTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(LocalStorageTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ProgressTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ResourceTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(RoleTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(SecretTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(SettingTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(UserTopics)));
        }


        /// <summary>
        /// Retrieve all allowed topics
        /// </summary>
        /// <returns></returns>
        private static List<string> GetAllTopicNames()
        {


            return topics;
        }

        /// <summary>
        /// Add a requestId to the list to allow the callback
        /// </summary>
        /// <param name="requestId"></param>
        public static void AddRequestId(string requestId)
        {
            requestIds.Add(requestId);
        }

        /// <summary>
        /// Check if topic exist
        /// </summary>
        /// <returns></returns>
        public static bool IsTopicNameAllowed(string topicName)
        {
            return GetAllTopicNames().Contains(topicName) || requestIds.Contains(topicName);
        }

        /// <summary>
        /// Check if the requestId callback is allowed
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns></returns>
        public static bool proceedRequestId(string requestId) => requestIds.Remove(requestId);
    }
}
