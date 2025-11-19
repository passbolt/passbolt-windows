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

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using passbolt_windows_winui3.Models.Users;
using Windows.System;

namespace passbolt_windows_winui3.Models.Authentication
{
    public class LocalUserManager
    {
        private UserOs userOs;

        public async Task<UserOs> GetCurrentUser()
        {
            if (this.userOs == null)
            {
                await this.RetrieveCurrentUser();
            }
            return this.userOs;
        }

        private async Task RetrieveCurrentUser()
        {
            IReadOnlyList<User> users = await User.FindAllAsync();
            var current = users.Where(p => p.AuthenticationStatus == UserAuthenticationStatus.LocallyAuthenticated &&
                            p.Type == UserType.LocalUser).FirstOrDefault();
            string data = await this.retrieveAccountName(current);

            if (string.IsNullOrEmpty(data))
            {
                data = await this.retrieveDisplayName(current);
            }


            if (string.IsNullOrEmpty(data))
            {
                data = await this.RetrieveNames(current);
            }

            this.userOs = new UserOs(data);
        }

        private async Task<string> RetrieveNames(User current)
        {
            var firstname = await current.GetPropertyAsync(KnownUserProperties.FirstName);
            var lastname = await current.GetPropertyAsync(KnownUserProperties.LastName);

            return firstname + " " + lastname;
        }

        private async Task<string> retrieveAccountName(User current)
        {
            string accountName = "";
            try
            {
                accountName = (string)await current.GetPropertyAsync(KnownUserProperties.AccountName);
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
            }

            return accountName;
        }

        private async Task<string> retrieveDisplayName(User current)
        {
            string displayName = "";
            try
            {
                displayName = (string)await current.GetPropertyAsync(KnownUserProperties.DisplayName);
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
            }

            return displayName;
        }
    }
}
