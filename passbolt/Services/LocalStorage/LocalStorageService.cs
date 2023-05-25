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



using System;
using System.Threading.Tasks;
using Microsoft.UI.Xaml.Controls;
using Newtonsoft.Json.Linq;
using passbolt.Models;
using passbolt.Models.LocalStorage;
using passbolt.Utils;

namespace passbolt.Services.LocalStorage
{
    public class LocalStorageService
    {
        /// <summary>
        /// Get the local storage of a webview and set it to another webview
        /// </summary>
        /// <param name="webviewSource"></param>
        /// <param name="webviewTarget"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task LoadLocalStorage(WebView2 webviewSource, WebView2 webviewTarget, string key)
        {
            var value = await this.GetLocalStorage(webviewSource, key);
            await this.SetLocalStorage(webviewTarget, key, value);
        }

        /// <summary>
        /// Get the local storage of a webview
        /// </summary>
        /// <param name="webview"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<string> GetLocalStorage(WebView2 webview, string key)
        {
            return await webview.CoreWebView2.ExecuteScriptAsync($"localStorage.getItem('{key}')");
        }

        /// <summary>
        /// Set the local storage of a webview
        /// </summary>
        /// <param name="webviewTarget"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public async Task SetLocalStorage(WebView2 webviewTarget, string key, string value) {
            await webviewTarget.CoreWebView2.ExecuteScriptAsync($"localStorage.setItem('{key}', {value})");
        }

        /// <summary>
        /// clear the local storage of a webview
        /// </summary>
        /// <param name="webviewTarget"></param>
        /// <returns></returns>
        public async Task ClearLocalStorage(WebView2 webviewTarget)
        {
            await webviewTarget.CoreWebView2.ExecuteScriptAsync($"localStorage.clear()");
        }

        /// <summary>
        /// remove a key from the local storage of a webview
        /// </summary>
        /// <param name="webviewTarget"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task RemoveLocalStorage(WebView2 webviewTarget, string key)
        {
            await webviewTarget.CoreWebView2.ExecuteScriptAsync($"localStorage.removeItem('{key}')");
        }


        /// <summary>
        /// Init passbolt data in the local storage of a webview for the first time
        /// </summary>
        /// <param name="rendered"></param>
        /// <param name="message"></param>
        public async void InitPassboltData(WebView2 rendered, string message)
        {
            // Wait as webview can still be on about:blank
            System.Threading.Thread.Sleep(500);

            var passboltData = await this.GetLocalStorage(rendered, "_passbolt_data");
            if (passboltData == "null")
            {
                await this.SetLocalStorage(rendered, "_passbolt_data", message);
            }
        }
    }
}
