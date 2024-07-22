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
        public const string BACKGROUND_IMPORT = "passbolt.background.import";
        public const string BACKGROUND_AFTER_LOGOUT = "passbolt.auth.after-logout";
        public const string BACKGROUND_DOWNLOAD_FILE = "passbolt.background.download-file";
        public const string BACKGROUND_STORE_PASSPHRASE = "passbolt.background.store-passphrase";
        public const string BACKGROUND_SET_THEME = "passbolt.background.set-theme";
        public const string BACKGROUND_SET_SECURITY_TOKEN = "passbolt.background.set-security-token";
        public const string BACKGROUND_SET_LOCALE = "passbolt.background.set-locale";
        public const string RENDERED_READY = "passbolt.rendered.is-ready";
        public const string RENDERED_STARTED = "passbolt.rendered.started";
        public const string BACKGROUND_GET_COOKIE = "passbolt.background.get-cookie";
        public const string BACKGROUND_ROTATE_KEY = "passbolt.background.rotate-private-key";
        public const string RENDERED_RELOAD = "passbolt.tab.reload";

        private static List<string> topics = new List<string>() { BACKGROUND_READY, ERROR, BACKGROUND_DOWNLOAD_FILE, BACKGROUND_STORE_PASSPHRASE, BACKGROUND_SET_THEME, BACKGROUND_SET_SECURITY_TOKEN, BACKGROUND_SET_LOCALE, RENDERED_READY, BACKGROUND_AFTER_LOGOUT, BACKGROUND_GET_COOKIE, BACKGROUND_ROTATE_KEY, RENDERED_RELOAD, RENDERED_STARTED };
        private static List<string> requestIds = new List<string>();
        private static Dictionary<string, string> pendingRequests = new Dictionary<string, string>();

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
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AccountRecoveryTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ActionLogsTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AuthenticationTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(AuthImportTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(BrowserTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(CommentTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(FavoriteTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(FolderTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(GroupTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ImportExportTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(LocaleTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(LocalStorageTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(KeyringTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(MfaTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PownedPasswordTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PasswordExpiryTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PasswordGeneratorTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(PasswordPoliciesTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ProgressTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(RbacTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ResourceTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(RoleTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(SecretTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(SettingTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ShareTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(TagTopics)));
            topics.AddRange(ListHelper.GetClassContantsToList(typeof(ThemeTopics)));
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
        /// Add a pending requests to the list to allow the callback
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void AddPendingRequest(string key, string value) => pendingRequests.Add(key, value);

        /// <summary>
        /// Return value per key
        /// </summary>
        /// <param name="key"></param>
        public static string GetPendingRequest(string key) => pendingRequests.GetValueOrDefault(key);

        /// <summary>
        /// Check if list has pending value
        /// </summary>
        /// <param name="key"></param>
        public static bool HasPendingRequest(string key) => pendingRequests.ContainsKey(key);

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

        /// <summary>
        /// Remove a pending requests 
        /// </summary>
        /// <param name="key"></param>
        public static bool RemovePendingRequest(string key) => pendingRequests.Remove(key);
    }
}
