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

namespace passbolt.Models.Messaging
{
    public class AllowedTopics
    {
        public const string DESKTOPAUTHENTICATE = "passbolt.desktop.authenticate";
        public const string AFTERLOGIN = "passbolt.auth.after-login";
        public const string ISAUTHENTICATED = "passbolt.auth.is-authenticated";
        public const string ERROR = "passbolt.error";
        public const string GETSITESETTINGS = "passbolt.organization-settings.get";
        public const string GETVERSION = "passbolt.addon.get-version";
        public const string FINDLOGGEDINUSER = "passbolt.users.find-logged-in-user";
        public const string GETLOCALE = "passbolt.locale.get";
        public const string GETALLRESOURCETYPE = "passbolt.resource-type.get-all";
        public const string FINDPERMISSIONSRESSOURCE = "passbolt.resources.find-permissions";
        public const string GETALLROLES = "passbolt.role.get-all";
        public const string FINDALLRESOURCES = "passbolt.resources.find-all";
        public const string UPDATELOCALSTORAGEFOLDERS = "passbolt.folders.update-local-storage";
        public const string UPDATELOCALSTORAGERESOURCES = "passbolt.resources.update-local-storage";
        public const string UPDATELOCALSTORAGEGROUPS = "passbolt.groups.update-local-storage";
        public const string UPDATELOCALSTORAGEUSERS = "passbolt.users.update-local-storage";
        public const string DECRYPTSECRET = "passbolt.secret.decrypt";
        public const string PASSPHRASEREQUEST = "passbolt.passphrase.request";
        public const string PASSWORDGENERATORSETTINGS = "passbolt.password-generator.settings";
        public const string PROGRESSOPENDIALOG = "passbolt.progress.open-progress-dialog";
        public const string PROGRESSUPDATEGOALS = "passbolt.progress.update-goals";
        public const string PROGRESSCLOSEDIALOG = "passbolt.progress.close-progress-dialog";
        public const string PROGRESSUPDATE = "passbolt.progress.update";
        public const string FINDALLCOMMENTBYRESSOURCE = "passbolt.comments.find-all-by-resource";
        public const string FINDALLACTIONLOGS = "passbolt.actionlogs.find-all-for";
        public const string CREATEFOLDERS = "passbolt.folders.create";
        public const string UPDATEFOLDERS = "passbolt.folders.update";
        public const string FINDALLFOLDERS = "passbolt.folders.find-permissions";
        public const string DELETEFOLDERS = "passbolt.folders.delete";
        public const string OPENDIALOGFOLDERS = "passbolt.folders.open-move-confirmation-dialog";
        public const string CREATECOMMENT = "passbolt.comments.create";
        public const string DELETECOMMENT = "passbolt.comments.delete";
        public const string UPDATERESOURCES = "passbolt.resources.update";
        public const string CREATERESOURCES = "passbolt.resources.create";
        public const string DELETEALLRESOURCES = "passbolt.resources.delete-all";
        public const string BACKGROUNDREADY = "passbolt.background.is-ready";

        private static List<string> requestIds = new List<string>();
        /// <summary>
        /// Retrieve all allowed topics
        /// </summary>
        /// <returns></returns>
        private static List<string> GetAllTopicNames()
        {
            return new List<string> { BACKGROUNDREADY, DELETEALLRESOURCES, CREATEFOLDERS, UPDATEFOLDERS, UPDATERESOURCES, CREATERESOURCES, DELETECOMMENT, CREATECOMMENT, OPENDIALOGFOLDERS, DELETEFOLDERS, FINDALLFOLDERS, FINDALLCOMMENTBYRESSOURCE, FINDALLACTIONLOGS, FINDALLCOMMENTBYRESSOURCE, FINDPERMISSIONSRESSOURCE, PROGRESSOPENDIALOG, ISAUTHENTICATED, PASSWORDGENERATORSETTINGS, PROGRESSUPDATEGOALS, PROGRESSCLOSEDIALOG, PROGRESSUPDATE, PASSPHRASEREQUEST, DESKTOPAUTHENTICATE, AFTERLOGIN, GETSITESETTINGS, GETVERSION, FINDLOGGEDINUSER, GETLOCALE, GETALLRESOURCETYPE, GETALLROLES, FINDALLRESOURCES, UPDATELOCALSTORAGEFOLDERS, UPDATELOCALSTORAGERESOURCES, UPDATELOCALSTORAGEGROUPS, UPDATELOCALSTORAGEUSERS, DECRYPTSECRET };
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
