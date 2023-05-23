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
using passbolt.Models.Authentication;
using passbolt.Models.CredentialLocker;
using passbolt.Utils;
using Windows.Security.Credentials;

namespace passbolt.Services.CredentialLockerService
{
    public class CredentialLockerService
    {
        private PasswordVault vault = new PasswordVault();
        private LocalUserManager localUserManager = new LocalUserManager();

        /// <summary>
        /// Create an entry in the credential locker
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="password"></param>
        public void Create(string resource, string password)
        {
            var credential = new PasswordCredential(resource, localUserManager.userOs.username, password);
            vault.Add(credential);
        }

        /// <summary>
        /// Get an entry from the credential locker
        /// </summary>
        /// <param name="resource"></param>
        /// <returns></returns>
        public PasswordCredential Get(string resource)
        {
            return vault.Retrieve(resource, localUserManager.userOs.username);
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
        /// Get the application configuration from the credential locker
        /// </summary>
        /// <returns></returns>
        public ApplicationConfiguration GetApplicationConfiguration()
        {
            var credential = Get("configuration");
            return credential != null ? SerializationHelper.DeserializeFromJson<ApplicationConfiguration>(credential.Password) : null;
        }
    }
}