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
 * @since         0.4.0
 */

using Microsoft.Web.WebView2.Core;
using passbolt.Models.CredentialLocker;
using passbolt.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.Security.Authentication.Web.Provider;
using static System.Net.WebRequestMethods;

namespace passbolt.Services.Mfa
{
    public class MfaService
    {
        private static readonly MfaService instance = new MfaService();
        private MfaService() { }

        public static MfaService Instance { get => instance; }

        private List<Regex> mfaUrls;
        public string[] providers { private get;  set; }

        // Matches the external Duo MFA provider url (dynamic host, pattern aligned with the styleguide).
        // Shared by the navigation allow list (InitMfaUrls) and the IsDuoUrl check.
        private readonly Regex duoUrlRegex = new Regex("^https://api-[a-fA-F0-9]{8,16}\\.duosecurity\\.com(/.*)?$");

        // The Duo provider origin captured by the navigation during a Duo MFA process.
        // Reset on every InitMfaUrls (a new MFA process re-scopes it).
        private string duoUrl;


        /// <summary>
        /// Allow navigation to the API 
        /// </summary>
        /// <param name="url"></param>
        public List<Regex> InitMfaUrls(string trustedDomain)
        {
            //A new MFA process starts with no captured Duo domain
            this.duoUrl = null;
            this.mfaUrls = new List<Regex>
            {
                //Order is important
                new Regex($"^{trustedDomain}/mfa/verify/(duo|totp|yubikey)\\?redirect=/$"),
                //Allow the Duo MFA provider verify endpoints (prompt/callback) for the API check
                new Regex($"^{trustedDomain}/mfa/verify/duo(/(prompt|callback))?(\\?.*)?$"),
                //Allow navigation to the external Duo MFA provider (single source shared with IsDuoUrl)
                this.duoUrlRegex,
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
        /// Check if the given url is the external Duo MFA provider
        /// </summary>
        /// <param name="url"></param>
        /// <returns>bool</returns>
        public bool IsDuoUrl(string url)
        {
            return this.duoUrlRegex.IsMatch(url);
        }

        /// <summary>
        /// Store the Duo provider origin captured by the navigation during a Duo MFA process.
        /// The domain is dynamic (api-XXXX.duosecurity.com) so it can only be known at navigation time.
        /// </summary>
        /// <param name="url"></param>
        public void SetDuoUrl(string url)
        {
            this.duoUrl = UriBuilderHelper.GetHostAndShemeForUri(url);
        }

        /// <summary>
        /// The Duo provider origin captured during the ongoing Duo MFA process, null when none is ongoing
        /// </summary>
        /// <returns>string</returns>
        public string GetDuoUrl()
        {
            return this.duoUrl;
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
