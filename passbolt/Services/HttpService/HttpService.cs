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
using passbolt.Services.NavigationService;
using passbolt.Services.Mfa;
using passbolt.Models.Cookies;
using System;
using System.Text;
using Newtonsoft.Json;

namespace passbolt.Services.HttpService
{
    public class HttpService
    {
        private HttpClient httpClient;
        private string trustedDomain = null;
        public string pownedUrl = "https://api.pwnedpasswords.com";
        // Duo loads its analytics from amplitude, allowed only for the rendered webview during a Duo MFA process
        public string amplitudeUrl = "https://api2.amplitude.com/2/httpapi";
        // The webviews load their own assets (scripts, styles, fonts, images, locales) from these installed dist hosts
        private readonly string renderedDistHost = "https://rendered.dist";
        private readonly string backgroundDistHost = "https://background.dist";
        private CredentialLockerService credentialLockerService;
        private CookiesManager cookiesManager;

        /// <summary>
        /// HttpService constructor
        /// </summary>
        public HttpService()
        {
            // Create an HttpClientHandler object and set to use default credentials
            HttpClientHandler handler = new HttpClientHandler();
            handler.AllowAutoRedirect = false;
            httpClient = new HttpClient(handler);
            credentialLockerService = new CredentialLockerService();
            cookiesManager = CookiesManager.Instance;
        }

        /// <summary>
        /// Check if the request is authorized by checking the trusted domain
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="webviewRequest"></param>
        /// <exception cref="UnauthorizedAPICallException"></exception>
        public void CheckAPICall(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs webviewRequest)
        {
            if (!this.isCallToServer(webviewRequest) && !this.isCallToPownedService(webviewRequest))
            {
                return;
            }
        }

        /// <summary>
        /// Init the trusted domain if this one is not set yet
        /// </summary>
        /// <param name="trustedDomainFromMetadata"></param>
        public void setTrustedDomain(String trustedDomainFromMetadata)
        {
            // Only init trustedDomain if not set yet
            if(this.trustedDomain == null)
            {
                this.trustedDomain = trustedDomainFromMetadata;
            }
        }
        /// <summary>
        /// Unset the trusted domain
        /// </summary>
        public void unSetTrustedDomain()
        {
            this.trustedDomain = null;
        }

        /// <summary>
        /// check if http call is made to the trusted domain
        /// </summary>
        /// <param name="webviewRequest"></param>
        /// <returns></returns>
        public bool isCallToServer(CoreWebView2WebResourceRequestedEventArgs webviewRequest) => UriBuilderHelper.IsSameOrigin(webviewRequest.Request.Uri, this.trustedDomain);

        /// <summary>
        /// check if http call is made to the powned service
        /// </summary>
        /// <param name="webviewRequest"></param>
        /// <returns></returns>
        public bool isCallToPownedService(CoreWebView2WebResourceRequestedEventArgs webviewRequest) => UriBuilderHelper.IsSameOrigin(webviewRequest.Request.Uri, pownedUrl);

        /// <summary>
        /// Strict allow list applied to every webview resource request.
        /// Any (resource context / origin) pair that is not explicitly authorized is blocked.
        /// The rules mirror the webviews CSP and add the Duo exceptions while a Duo MFA process is ongoing.
        /// </summary>
        /// <param name="uri">the requested url</param>
        /// <param name="context">the resource context of the request</param>
        /// <param name="isRendered">true when the request comes from the rendered webview, false for the background webview</param>
        /// <returns>bool</returns>
        public bool IsResourceAllowed(string uri, CoreWebView2WebResourceContext context, bool isRendered)
        {
            // The per session virtual host is owned by the navigation service of each webview
            string virtualHost = isRendered
                ? RenderedNavigationService.Instance.trustedUrl
                : BackgroundNavigationService.Instance.trustedUrl;
            string distHost = isRendered ? this.renderedDistHost : this.backgroundDistHost;
            switch (context)
            {
                case CoreWebView2WebResourceContext.XmlHttpRequest:
                    return this.isOnVirtualHost(uri, virtualHost, distHost)
                        || this.isOnTrustedDomain(uri)
                        || UriBuilderHelper.IsSameOrigin(uri, this.pownedUrl)
                        || this.isDuoAllowed(uri, context, isRendered);

                case CoreWebView2WebResourceContext.Script:
                    return this.isOnVirtualHost(uri, virtualHost, distHost)
                        || (isRendered && this.isOnTrustedDomain(uri))
                        || this.isDuoAllowed(uri, context, isRendered);

                case CoreWebView2WebResourceContext.Stylesheet:
                    return isRendered
                        && (this.isOnVirtualHost(uri, virtualHost, distHost)
                            || this.isOnTrustedDomain(uri)
                            || this.isDuoAllowed(uri, context, isRendered));

                case CoreWebView2WebResourceContext.Font:
                    return isRendered && (this.isOnVirtualHost(uri, virtualHost, distHost) || this.isOnTrustedDomain(uri));

                case CoreWebView2WebResourceContext.Image:
                    return isRendered
                        && (this.isOnVirtualHost(uri, virtualHost, distHost)
                            || this.isOnTrustedDomain(uri)
                            || this.isDuoAllowed(uri, context, isRendered));

                case CoreWebView2WebResourceContext.Media:
                case CoreWebView2WebResourceContext.Websocket:
                    return false;

                default:
                    // Other contexts (eg. the top level Document) are governed by the navigation guard.
                    return true;
            }
        }

        /// <summary>
        /// Block a disallowed resource request by returning an empty forbidden response
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="resource"></param>
        public void BlockRequest(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs resource)
        {
            CoreWebView2WebResourceResponse response = sender.Environment.CreateWebResourceResponse(
                null,
                (int)HttpStatusCode.Forbidden,
                HttpStatusCode.Forbidden.ToString(),
                string.Empty);
            resource.Response = response;
        }

        /// <summary>
        /// check if the url is served by the webview own virtual host (per session host or installed dist host)
        /// </summary>
        private bool isOnVirtualHost(string uri, string virtualHost, string distHost)
        {
            return (!string.IsNullOrEmpty(virtualHost) && UriBuilderHelper.IsSameOrigin(uri, $"https://{virtualHost}"))
                || UriBuilderHelper.IsSameOrigin(uri, distHost);
        }

        /// <summary>
        /// check if the url targets the trusted domain
        /// </summary>
        private bool isOnTrustedDomain(string uri) => UriBuilderHelper.IsSameOrigin(uri, this.trustedDomain);

        /// <summary>
        /// Duo exceptions: allowed only on the rendered webview while a Duo MFA process is ongoing.
        /// Covers the captured Duo provider origin and, for XHR only, its amplitude analytics endpoint.
        /// </summary>
        private bool isDuoAllowed(string uri, CoreWebView2WebResourceContext context, bool isRendered)
        {
            if (!isRendered || MfaService.Instance.GetDuoUrl() == null)
            {
                return false;
            }

            // Duo loads its analytics from amplitude through XHR only.
            // amplitudeUrl carries a path, so we match the origin then keep the path constraint.
            bool isAmplitudeXhr = context == CoreWebView2WebResourceContext.XmlHttpRequest
                && UriBuilderHelper.IsSameOrigin(uri, this.amplitudeUrl)
                && Uri.TryCreate(uri, UriKind.Absolute, out Uri amplitudeCandidate)
                && Uri.TryCreate(this.amplitudeUrl, UriKind.Absolute, out Uri amplitudeExpected)
                && IsSamePathOrSubPath(amplitudeCandidate.AbsolutePath, amplitudeExpected.AbsolutePath);

            return this.isOnDuo(uri) || isAmplitudeXhr;
        }

        /// <summary>
        /// Check that a candidate path is the expected path itself or a sub path of it.
        /// Anchored on a "/" boundary so that a sibling sharing the same prefix
        /// is not accepted.
        /// </summary>
        private static bool IsSamePathOrSubPath(string candidatePath, string expectedPath)
        {
            return candidatePath == expectedPath
                || candidatePath.StartsWith(expectedPath.TrimEnd('/') + "/", StringComparison.Ordinal);
        }

        /// <summary>
        /// check if the url targets the Duo provider origin captured by the navigation during the MFA process
        /// </summary>
        private bool isOnDuo(string uri)
        {
            string duoUrl = MfaService.Instance.GetDuoUrl();
            return UriBuilderHelper.IsSameOrigin(uri, duoUrl);
        }

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

            //Split headers entries per line 
            List<string> headers = response.Headers
                .SelectMany(h => h.Value.Select(value => $"{h.Key}: {value}"))                                             
                .ToList();

            List<string> cookies = extractCookieFromHeader(headers);
            addCookiesToManager(cookies);

            // Create Webview2 response
            CoreWebView2WebResourceResponse webView2WebResourceResponse = sender.Environment.CreateWebResourceResponse(
                content,
                (int)response.StatusCode,
                !string.IsNullOrEmpty(response.ReasonPhrase) ? response.ReasonPhrase : response.StatusCode.ToString(),
                string.Join('\n', headers));

            resource.Response = webView2WebResourceResponse;
        }

        public void SendErrorToWebview(CoreWebView2 sender, CoreWebView2WebResourceRequestedEventArgs resource, HttpRequestMessage request, String errorMessage)
        {
            //Create a single line message
            string[] substrings = errorMessage.Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
            string message = substrings.Length > 1 ? substrings[1] : errorMessage;

            //Create payload to allow the toJson() method on Background
            string payload = JsonConvert.SerializeObject(new
            {
                header = new { message = message },
                body = errorMessage,
            });

            var httpContent = new StringContent(payload, Encoding.UTF8, "application/json");
            var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = httpContent,
                ReasonPhrase = HttpStatusCode.BadRequest.ToString(),
                StatusCode = HttpStatusCode.BadRequest,
                RequestMessage = request
            };
            this.SendResponseToWebview(sender, resource, response);
        }

        /// <summary>
        /// Extract the cookies from the response headers   
        /// </summary>
        /// <param name="headers"></param>
        private List<string> extractCookieFromHeader(List<string> headers)
        {
            var setCookieHeaders = headers
            .Where(header => header.StartsWith("Set-Cookie:", StringComparison.OrdinalIgnoreCase))
            .ToList();

            return setCookieHeaders.Any() ? setCookieHeaders : null;
        }

        /// <summary>
        /// the headers list of cookies
        /// </summary>
        /// <param name="cookies"></param>
        private void addCookiesToManager(List<string> cookies)
        {
            if (cookies != null)
            {
                foreach (var cookie in cookies)
                {
                    cookiesManager.addCookie(cookie);
                }
            }
        }
    }
}
