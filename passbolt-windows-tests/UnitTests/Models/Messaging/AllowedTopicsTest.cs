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
            bool findAllFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.FIND_ALL);
            bool openDialogFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.OPEN_DIALOG);
            bool updateLocalStorageFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.UPDATE_LOCALSTORAGE);
            bool createFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.CREATE);
            bool deleteFolders = AllowedTopics.IsTopicNameAllowed(FolderTopics.DELETE);

            Assert.IsTrue(findAllFolders);
            Assert.IsTrue(openDialogFolders);
            Assert.IsTrue(updateLocalStorageFolders);
            Assert.IsTrue(createFolders);
            Assert.IsTrue(deleteFolders);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedCommentTopics()
        {
            bool deleteComment = AllowedTopics.IsTopicNameAllowed(CommentTopics.DELETE);
            bool createComment = AllowedTopics.IsTopicNameAllowed(CommentTopics.CREATE);
            bool findAllCommentByRessource = AllowedTopics.IsTopicNameAllowed(CommentTopics.FIND_ALL_BY_RESSOURCE);

            Assert.IsTrue(createComment);
            Assert.IsTrue(deleteComment);
            Assert.IsTrue(findAllCommentByRessource);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedGroupTopics()
        {
            bool updateLocalStorageGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.UPDATE_LOCALESTORAGE);
            bool createGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.CREATE);
            bool deleteGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.DELETE);
            bool findAllGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.FINDALL);
            bool deleteDryRunGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.DELETE_DRY_RUN);
            bool updateGroups = AllowedTopics.IsTopicNameAllowed(GroupTopics.UPDATE);

            Assert.IsTrue(updateLocalStorageGroups);
            Assert.IsTrue(createGroups);
            Assert.IsTrue(deleteGroups);
            Assert.IsTrue(findAllGroups);
            Assert.IsTrue(deleteDryRunGroups);
            Assert.IsTrue(updateGroups);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedLocaleTopics()
        {
            bool getLocale = AllowedTopics.IsTopicNameAllowed(LocaleTopics.GET);

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
            bool updateLocalStorageResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.UPDATE_LOCALSTORAGE);
            bool findAllResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.FIND_ALL);
            bool deleteAllResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.DELETE_ALL);
            bool createResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.CREATE);
            bool findPermissionsResource = AllowedTopics.IsTopicNameAllowed(ResourceTopics.FIND_PERMISSION);
            bool getAllResourceType = AllowedTopics.IsTopicNameAllowed(ResourceTopics.GET_ALL);
            bool updateResources = AllowedTopics.IsTopicNameAllowed(ResourceTopics.UPDATE);

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
            bool getAllRoles = AllowedTopics.IsTopicNameAllowed(RoleTopics.GET_ALL);

            Assert.IsTrue(getAllRoles);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedSecretTopics()
        {
            bool decryptSecret = AllowedTopics.IsTopicNameAllowed(SecretTopics.DECRYPT_SECRET);
            bool passphraseRequest = AllowedTopics.IsTopicNameAllowed(SecretTopics.PASSPHRASE_REQUEST);

            Assert.IsTrue(decryptSecret);
            Assert.IsTrue(passphraseRequest);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedSettingTopics()
        {
            bool passwordGeneratorSettings = AllowedTopics.IsTopicNameAllowed(SettingTopics.PASSWORD_GENERATOR_SETTINGS);
            bool getSiteSettings = AllowedTopics.IsTopicNameAllowed(SettingTopics.GET);
            bool getVersion = AllowedTopics.IsTopicNameAllowed(SettingTopics.GET_VERSION);

            Assert.IsTrue(passwordGeneratorSettings);
            Assert.IsTrue(getSiteSettings);
            Assert.IsTrue(getVersion);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedUserTopics()
        {
            bool updateLocalStorageUsers = AllowedTopics.IsTopicNameAllowed(UserTopics.UPDATE_LOCALSTORAGE);
            bool findLoggedInUser = AllowedTopics.IsTopicNameAllowed(UserTopics.FIND_LOGGED_IN_USER);
            bool getAllUsers = AllowedTopics.IsTopicNameAllowed(UserTopics.GET_ALL);
            bool createUsers = AllowedTopics.IsTopicNameAllowed(UserTopics.CREATE);
            bool resendInvite = AllowedTopics.IsTopicNameAllowed(UserTopics.RESEND_INVITE);
            bool deleteUser = AllowedTopics.IsTopicNameAllowed(UserTopics.DELETE);
            bool deleteDryRunUser = AllowedTopics.IsTopicNameAllowed(UserTopics.DELETE_DRY_RUN);

            Assert.IsTrue(updateLocalStorageUsers);
            Assert.IsTrue(findLoggedInUser);
            Assert.IsTrue(getAllUsers);
            Assert.IsTrue(createUsers);
            Assert.IsTrue(resendInvite);
            Assert.IsTrue(deleteUser);
            Assert.IsTrue(deleteDryRunUser);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedActionLogsTopics()
        {
            bool findAllActionLogs = AllowedTopics.IsTopicNameAllowed(ActionLogsTopics.FIND_ALL);

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

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedLocalStorageTopics()
        {
            bool clearStorage = AllowedTopics.IsTopicNameAllowed(LocalStorageTopics.BACKGROUND_LOCALSTORAGE_CLEAR);
            bool updateStorage = AllowedTopics.IsTopicNameAllowed(LocalStorageTopics.BACKGROUND_LOCALSTORAGE_UPDATE);
            bool deleteStorage = AllowedTopics.IsTopicNameAllowed(LocalStorageTopics.BACKGROUND_LOCALSTORAGE_DELETE);

            Assert.IsTrue(clearStorage);
            Assert.IsTrue(updateStorage);
            Assert.IsTrue(deleteStorage);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedShareTopics()
        {
            bool saveResources = AllowedTopics.IsTopicNameAllowed(ShareTopics.SAVE_RESOURCES);
            bool saveFolders = AllowedTopics.IsTopicNameAllowed(ShareTopics.SAVE_FOLDERS);
            bool getResources = AllowedTopics.IsTopicNameAllowed(ShareTopics.GET_RESOURCES);
            bool searchAros = AllowedTopics.IsTopicNameAllowed(ShareTopics.SEARCH_AROS);
            bool getFolders = AllowedTopics.IsTopicNameAllowed(ShareTopics.GET_FOLDERS);

            Assert.IsTrue(getResources);
            Assert.IsTrue(searchAros);
            Assert.IsTrue(getFolders);
            Assert.IsTrue(saveFolders);
            Assert.IsTrue(saveResources);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedKeyringTopics()
        {
            bool getPublicInfoByUser = AllowedTopics.IsTopicNameAllowed(KeyringTopics.GET_PUBLIC_KEY_INFO_BY_USER);
            bool getKeyInfo = AllowedTopics.IsTopicNameAllowed(KeyringTopics.GET_KEY_INFO);;

            Assert.IsTrue(getPublicInfoByUser);
            Assert.IsTrue(getKeyInfo);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedFavoriteTopics()
        {
            bool addFavorite = AllowedTopics.IsTopicNameAllowed(FavoriteTopics.ADD);
            bool deleteFavorite = AllowedTopics.IsTopicNameAllowed(FavoriteTopics.DELETE);

            Assert.IsTrue(addFavorite);
            Assert.IsTrue(deleteFavorite);
        }        
        
        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedPasswordGeneratorTopics()
        {
            bool getSettings = AllowedTopics.IsTopicNameAllowed(PasswordGeneratorTopics.GET_SETTINGS);

            Assert.IsTrue(getSettings);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedTagTopics()
        {
            bool addTag = AllowedTopics.IsTopicNameAllowed(TagTopics.ADD);
            bool deleteTag = AllowedTopics.IsTopicNameAllowed(TagTopics.DELETE);
            bool findAllTag = AllowedTopics.IsTopicNameAllowed(TagTopics.FIND_ALL);
            bool updateTag = AllowedTopics.IsTopicNameAllowed(TagTopics.UPDATE);
            bool updateResourcesTags = AllowedTopics.IsTopicNameAllowed(TagTopics.UPDATE_RESOURCE_TAGS);

            Assert.IsTrue(addTag);
            Assert.IsTrue(deleteTag);
            Assert.IsTrue(findAllTag);
            Assert.IsTrue(updateTag);
            Assert.IsTrue(updateResourcesTags);
        }


        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedImportExportTopics()
        {
            bool import = AllowedTopics.IsTopicNameAllowed(ImportExportTopics.IMPORT);
            bool export = AllowedTopics.IsTopicNameAllowed(ImportExportTopics.EXPORT);

            Assert.IsTrue(import);
            Assert.IsTrue(export);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedPownedPasswordTopics()
        {
            bool checkPassword = AllowedTopics.IsTopicNameAllowed(PownedPasswordTopics.CHECK);

            Assert.IsTrue(checkPassword);
        }

        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldValidadedAccountRecoveryTopics()
        {
            bool validateOrganizationPrivateKey = AllowedTopics.IsTopicNameAllowed(AccountRecoveryTopics.VALIDATE_ORGANIZATION_PRIVATE_KEY);
            bool getOrganizationPolicy = AllowedTopics.IsTopicNameAllowed(AccountRecoveryTopics.GET_ORGANIZATION_POLICY);
            bool getUserRequests = AllowedTopics.IsTopicNameAllowed(AccountRecoveryTopics.GET_USER_REQUESTS);
            bool reviewRequest = AllowedTopics.IsTopicNameAllowed(AccountRecoveryTopics.REVIEW_REQUEST);

            Assert.IsTrue(validateOrganizationPrivateKey);
            Assert.IsTrue(getOrganizationPolicy);
            Assert.IsTrue(getUserRequests);
            Assert.IsTrue(reviewRequest);
        }

    }
}
