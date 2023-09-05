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
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.Web.WebView2.Core;
using passbolt.Exceptions;
using passbolt.Utils;
using Windows.Storage.Streams;
using passbolt.Services.CredentialLocker;

namespace passbolt.Services.HttpService
{
    public class HttpService
    {
        private HttpClient httpClient;
        private string trustedDomain = null;
        public string pownedUrl = "https://api.pwnedpasswords.com";
        private CredentialLockerService credentialLockerService;

        /// <summary>
        /// HttpService constructor
        /// </summary>
        public HttpService()
        {
            httpClient = new HttpClient();
            credentialLockerService = new CredentialLockerService();
        }

        /// <summary>
        /// Check if the request is authorized by checking the trusted domain
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="webviewRequest"></param>
        /// <exception cref="UnauthorizedAPICallException"></exception>
        public async void CheckAPICall(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs webviewRequest)
        {
            if(this.trustedDomain == null)
            {
                var metaData = await this.credentialLockerService.GetAccountMetadata();
                this.trustedDomain = metaData != null ? metaData.domain : null;
            }

            if (!this.isCallToServer(webviewRequest) && !this.isCallToPownedService(webviewRequest))
            {
                throw new UnauthorizedAPICallException();
            }
        }

        /// <summary>
        /// check if http call is made to the trusted domain
        /// </summary>
        /// <param name="webviewRequest"></param>
        /// <returns></returns>
        public bool isCallToServer(CoreWebView2WebResourceRequestedEventArgs webviewRequest) => this.trustedDomain != null && webviewRequest.Request.Uri.StartsWith(this.trustedDomain);

        /// <summary>
        /// check if http call is made to the powned service
        /// </summary>
        /// <param name="webviewRequest"></param>
        /// <returns></returns>
        public bool isCallToPownedService(CoreWebView2WebResourceRequestedEventArgs webviewRequest) => webviewRequest.Request.Uri.StartsWith(pownedUrl);

        /// <summary>
        /// Create http request from webview request
        /// </summary>
        /// <param name="webviewRequest"></param>
        /// <returns>HttpRequestMessage</returns>
        public HttpRequestMessage BuildHttpRequest(CoreWebView2WebResourceRequestedEventArgs webviewRequest)
        {
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod(webviewRequest.Request.Method), webviewRequest.Request.Uri);

            if (webviewRequest.Request.Content != null)
            {
                var stream = webviewRequest.Request.Content.AsStream();
                request.Content = new StreamContent(stream);
            }

            foreach (KeyValuePair<string, string> header in webviewRequest.Request.Headers)
            {
                string key = header.Key.ToUpper();

                if (key != "CONTENT-TYPE")
                {
                    request.Headers.Add(key, header.Value);
                }
                else if (webviewRequest.Request.Content != null)
                {
                    request.Content.Headers.Add(key, header.Value);
                }
            }

            return request;
        }

        /// <summary>
        /// Send request as a proxy
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The server response</returns>
        public Task<HttpResponseMessage> SendRequest(HttpRequestMessage request) => httpClient.SendAsync(request);

        /// <summary>
        /// Resolve option method, this method is not supported by API
        /// </summary>
        /// <param name="resource"></param>
        public void ResolveOptionMethod(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs resource)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = null,
                ReasonPhrase = "Option method"
            };

            this.SendResponseToWebview(sender, resource, response);
        }

        /// <summary>
        /// Add cors headers to the response
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="response"></param>
        public void AddCorsHeaders(CoreWebView2 sender, HttpResponseMessage response)
        {

            //Get the webview host and scheme
            string desktopWebview = UriBuilderHelper.GetHostAndShemeForUri(sender.Source);
            //Map the response headers to avoid cors issue
            response.Headers.Add("Access-Control-Allow-Origin", desktopWebview);
            response.Headers.Add("Access-Control-Allow-Credentials", "true");
            response.Headers.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, PUT");
            response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-csrf-token");
        }

        /// <summary>
        /// Send response to webview    
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="resource"></param>
        /// <param name="response"></param>
        public void SendResponseToWebview(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs resource, HttpResponseMessage response)
        {
            IRandomAccessStream content = null;

            if (response.Content != null)
            {
                var stream = response.Content.ReadAsStreamAsync().Result;
                content = StreamHelper.ConvertStreamToAccessStream(stream).Result;
            }

            // Add cors headers to avoid cors issue
            this.AddCorsHeaders(sender, response);

            List<string> headers = response.Headers.Select(h => $"{h.Key}: {string.Join(",", h.Value)}").ToList();

            // Create Webview2 response
            CoreWebView2WebResourceResponse webView2WebResourceResponse = sender.Environment.CreateWebResourceResponse(
                content,
                (int)response.StatusCode,
                response.StatusCode.ToString(),
                string.Join('\n', headers));

            resource.Response = webView2WebResourceResponse;
        }
    }
}
