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

using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace passbolt_windows_winui3.Services.NavigationService
{
    public class BackgroundNavigationService : AbstractNavigationService
    {
        private static readonly BackgroundNavigationService instance = new BackgroundNavigationService();
        private string previousNavigation;

        public static BackgroundNavigationService Instance { get => instance; }

        public BackgroundNavigationService() { }

        public void Initialize(string url)
        {
            //Check the url validity before settings
            this.trustedUrl = url;
            var escaptedUrl = Regex.Escape(url);

            base.allowedUrls = new List<Regex>()
                {
                    new Regex($"^https://{escaptedUrl}/Background/(index-import\\.html|index-auth\\.html|index-workspace\\.html)$"),
                };
        }

        /// <summary>
        /// Set the previous navigation
        /// </summary>
        /// <param name="url"></param>
        public void SetPreviousNavigation(string url)
        {
            this.previousNavigation = url;
        }

        /// <summary>
        /// Check if background webview is running the authentication file
        /// </summary>
        /// <returns></returns>
        public bool IsAuthApplication(string url)
        {
            return url == $"https://{this.trustedUrl}/Background/index-auth.html";
        }

        /// <summary>
        /// Check if background webview is running the import file
        /// </summary>
        /// <returns></returns>
        public bool IsImportApplication(string url)
        {
            return url == $"https://{this.trustedUrl}/Background/index-import.html";
        }

        /// <summary>
        /// Check navigation history to verify if workspace loading comes from importation
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public bool IsWorkspaceFromImportationApplication(string url)
        {
            return this.previousNavigation != null && this.previousNavigation.Contains("/Background/index-import.html")
                && url == $"https://{this.trustedUrl}/Background/index-workspace.html";
        }
    }
}
