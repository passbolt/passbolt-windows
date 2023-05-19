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

using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Models.Messaging;
using passbolt.Models.Messaging.Topics;

namespace passbolt_windows_tests.UnitTests.Models.Messaging
{
    [TestClass]
    public class AllowedTopicsTest
    {

        [TestMethod]
        public void IsTopicNameAllowed_InvalidTopic_ShouldReturnFalse()
        {
            string invalidTopic = "invalid_topic";
            bool result = AllowedTopics.IsTopicNameAllowed(invalidTopic);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedFolderTopics()
        {
            bool findAllFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.FINDALLFOLDERS);
            bool openDialogFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.OPENDIALOGFOLDERS);
            bool updateLocalStorageFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.UPDATELOCALSTORAGEFOLDERS);
            bool createFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.CREATEFOLDERS);
            bool deleteFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.DELETEFOLDERS);

            Assert.IsTrue(findAllFolders);
            Assert.IsTrue(openDialogFolders);
            Assert.IsTrue(updateLocalStorageFolders);
            Assert.IsTrue(createFolders);
            Assert.IsTrue(deleteFolders);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedCommentTopics()
        {
            bool deleteComment = AllowedTopics.IsTopicNameAllowed(CommentTopics.DELETECOMMENT);
            bool createComment = AllowedTopics.IsTopicNameAllowed(CommentTopics.CREATECOMMENT);
            bool findAllCommentByRessource = AllowedTopics.IsTopicNameAllowed(CommentTopics.FINDALLCOMMENTBYRESSOURCE);

            Assert.IsTrue(createComment);
            Assert.IsTrue(deleteComment);
            Assert.IsTrue(findAllCommentByRessource);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedGroupTopics()
        {
            bool updateLocalStorageGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.UPDATELOCALSTORAGEGROUPS);

            Assert.IsTrue(updateLocalStorageGroups);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedLocaleTopics()
        {
            bool getLocale = AllowedTopics.IsTopicNameAllowed(LocaleTopics.GETLOCALE);

            Assert.IsTrue(getLocale);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedProcessTopics()
        {
            bool processCloseDialog = AllowedTopics.IsTopicNameAllowed(ProgressTopics.PROGRESSCLOSEDIALOG);
            bool processOpenDialog = AllowedTopics.IsTopicNameAllowed(ProgressTopics.PROGRESSOPENDIALOG);
            bool processUpdateGoals = AllowedTopics.IsTopicNameAllowed(ProgressTopics.PROGRESSUPDATEGOALS);
            bool processUpdate = AllowedTopics.IsTopicNameAllowed(ProgressTopics.PROGRESSUPDATE);

            Assert.IsTrue(processCloseDialog);
            Assert.IsTrue(processOpenDialog);
            Assert.IsTrue(processUpdateGoals);
            Assert.IsTrue(processUpdate);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedResourceTopics()
        {
            bool updateLocalStorageResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.UPDATELOCALSTORAGERESOURCES);
            bool findAllResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.FINDALLRESOURCES);
            bool deleteAllResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.DELETEALLRESOURCES);
            bool createResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.CREATERESOURCES);
            bool findPermissionsResource = AllowedTopics.IsTopicNameAllowed(ResourceTopics.FINDPERMISSIONSRESSOURCE);
            bool getAllResourceType = AllowedTopics.IsTopicNameAllowed(ResourceTopics.GETALLRESOURCETYPE);
            bool updateResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.UPDATERESOURCES);

            Assert.IsTrue(updateLocalStorageResources);
            Assert.IsTrue(findAllResources);
            Assert.IsTrue(deleteAllResources);
            Assert.IsTrue(createResources);
            Assert.IsTrue(findPermissionsResource);
            Assert.IsTrue(getAllResourceType);
            Assert.IsTrue(updateResources);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedRoleTopics()
        {
            bool getAllRoles = AllowedTopics.IsTopicNameAllowed(RoleTopics.GETALLROLES);

            Assert.IsTrue(getAllRoles);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedSecretTopics()
        {
            bool decryptSecret = AllowedTopics.IsTopicNameAllowed(SecretTopics.DECRYPTSECRET);
            bool passphraseRequest = AllowedTopics.IsTopicNameAllowed(SecretTopics.PASSPHRASEREQUEST);

            Assert.IsTrue(decryptSecret);
            Assert.IsTrue(passphraseRequest);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedSettingTopics()
        {
            bool passwordGeneratorSettings = AllowedTopics.IsTopicNameAllowed(SettingTopics.PASSWORDGENERATORSETTINGS);
            bool getSiteSettings = AllowedTopics.IsTopicNameAllowed(SettingTopics.GETSITESETTINGS);
            bool getVersion = AllowedTopics.IsTopicNameAllowed(SettingTopics.GETVERSION);

            Assert.IsTrue(passwordGeneratorSettings);
            Assert.IsTrue(getSiteSettings);
            Assert.IsTrue(getVersion);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedUserTopics()
        {
            bool updateLocalStorageUsers = AllowedTopics.IsTopicNameAllowed(UserTopics.UPDATELOCALSTORAGEUSERS);
            bool findLoggedInUser = AllowedTopics.IsTopicNameAllowed(UserTopics.FINDLOGGEDINUSER);

            Assert.IsTrue(updateLocalStorageUsers);
            Assert.IsTrue(findLoggedInUser);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedActionLogsTopics()
        {
            bool findAllActionLogs = AllowedTopics.IsTopicNameAllowed(ActionLogsTopics.FINDALLACTIONLOGS);

            Assert.IsTrue(findAllActionLogs);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedAuthenticationTopics()
        {
            bool afterLogin = AllowedTopics.IsTopicNameAllowed(AuthenticationTopics.AFTERLOGIN);
            bool isAuthenticated = AllowedTopics.IsTopicNameAllowed(AuthenticationTopics.ISAUTHENTICATED);
            bool desktopAuthenticate = AllowedTopics.IsTopicNameAllowed(AuthenticationTopics.DESKTOPAUTHENTICATE);

            Assert.IsTrue(afterLogin);
            Assert.IsTrue(isAuthenticated);
            Assert.IsTrue(desktopAuthenticate);
        }
    }
}
