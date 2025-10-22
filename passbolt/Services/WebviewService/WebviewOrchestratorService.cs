/**
* Passbolt ~ Open source password manager for teams
* Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
*
* Licensed under GNU Affero General Public License version 3 of the or any later version.
* For full copyright and license information, please see the LICENSE.txt
* Redistributions of files must retain the above copyright notice.
*
* @copyright     Copyright (c) 2025 Passbolt SA (https://www.passbolt.com)
* @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
* @link          https://www.passbolt.com Passbolt(tm)
* @since         2.5.0
*/
﻿
using System;

namespace passbolt.Services.WebviewService
{
    public sealed class WebviewOrchestratorService
    {
        private bool Rendered;
        private bool Background;

        private static readonly Lazy<WebviewOrchestratorService> _instance = new Lazy<WebviewOrchestratorService>(() => new WebviewOrchestratorService());

        public static WebviewOrchestratorService Instance => _instance.Value;

        private  WebviewOrchestratorService()
        {
            Rendered = true;
            Background = true;
        }

        /// <summary>
        /// Sets the Rendered webview status
        /// </summary>
        /// <param name="status">True if ready, false otherwise</param>
        public void SetRenderedStatus(bool status)
        {
            Rendered = status;
        }

        /// <summary>
        /// Sets the Background webview status
        /// </summary>
        /// <param name="status">True if ready, false otherwise</param>
        public void SetBackgroundStatus(bool status)
        {
            Background = status;
        }

        /// <summary>
        /// Checks if the Rendered webview is ready
        /// </summary>
        /// <returns>True if the Rendered webview is ready</returns>
        public bool IsRenderedReady()
        {
            return Rendered;
        }

        /// <summary>
        /// Checks if the Background webview is ready
        /// </summary>
        /// <returns>True if the Background webview is ready</returns>
        public bool IsBackgroundReady()
        {
            return Background;
        }

        /// <summary>
        /// Checks if all webviews are ready
        /// </summary>
        /// <returns>True if all webviews are ready</returns>
        public bool AreAllReady()
        {
            return Rendered && Background;
        }
    }
}
