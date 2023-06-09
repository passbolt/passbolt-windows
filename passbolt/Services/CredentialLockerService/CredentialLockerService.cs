﻿/**
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
using System.Threading.Tasks;
using passbolt.Models.Authentication;
using passbolt.Models.CredentialLocker;
using passbolt.Utils;
using Windows.Security.Credentials;

namespace passbolt.Services.CredentialLockerService
{
    public class CredentialLockerService
    {
        private PasswordVault vault;
        private LocalUserManager localUserManager;

        public CredentialLockerService() {
            this.vault = new PasswordVault();
            this.localUserManager = new LocalUserManager();
        }

        /// <summary>
        /// Create an entry in the credential locker
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="password"></param>
        public async Task Create(string resource, string password)
        {
            var currentUser = await localUserManager.GetCurrentUser();
            var credential = new PasswordCredential(resource, currentUser.username, password);
            vault.Add(credential);
        }

        /// <summary>
        /// Get an entry from the credential locker
        /// </summary>
        /// <param name="resource"></param>
        /// <returns></returns>
        public async Task<PasswordCredential> Get(string resource)
        {
            var currentUser = await localUserManager.GetCurrentUser();
            return vault.Retrieve(resource, currentUser.username);
        }

        /// <summary>
        /// Get all entries from the credential locker
        /// </summary>
        /// <returns></returns>
        public IReadOnlyCollection<PasswordCredential> GetAll()
        {
            return vault.RetrieveAll();
        }

        /// <summary>
        /// Get all entries from the credential locker
        /// </summary>
        /// <returns></returns>
        public async Task Remove(string resource)
        {
            var credential = await Get(resource);
            vault.Remove(credential);
        }

        /// <summary>
        /// Get the application configuration from the credential locker
        /// </summary>
        /// <returns></returns>
        public async Task<ApplicationConfiguration> GetApplicationConfiguration()
        {
            var credential = await Get("configuration");
            return credential != null ? SerializationHelper.DeserializeFromJson<ApplicationConfiguration>(credential.Password) : null;
        }
    }
}