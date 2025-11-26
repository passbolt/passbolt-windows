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
* @since         0.4.0
 */

using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace passbolt.Services.Mfa
{
    public class MfaService
    {
        private static readonly MfaService instance = new MfaService();
        private MfaService() { }

        public static MfaService Instance { get => instance; }

        private List<Regex> mfaUrls;
        public string[] providers { private get; set; }


        /// <summary>
        /// Allow navigation to the API 
        /// </summary>
        /// <param name="url"></param>
        public List<Regex> InitMfaUrls(string trustedDomain)
        {
            this.mfaUrls = new List<Regex>
            {
                //Order is important
                new Regex($"^{trustedDomain}/mfa/verify/(duo|totp|yubikey)\\?redirect=/$"),
                //The complete step
                new Regex($"^{trustedDomain}/$"),
            };
            return this.mfaUrls;
        }

        /// <summary>
        /// Check url to know if MFA has been completed
        /// </summary>
        /// <param name="url"></param>
        /// <returns>bool</returns>
        public bool HasMfaCompleted(string url)
        {
            var mfaCompleted = this.mfaUrls.Last().IsMatch(url);
            return mfaCompleted;
        }


        /// <summary>
        /// Check if rendered webview is running on the API MFA urls
        /// </summary>
        /// <param name="url"></param>
        /// <returns>bool</returns>        
        public bool IsMfaUrls(string url)
        {
            if (this.mfaUrls != null)
            {
                return this.mfaUrls.Any(regex => regex.IsMatch(url));
            }
            return false;
        }
    }
}
