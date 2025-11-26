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
* @since         0.6.0
*/

using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace passbolt.Models.Cookies
{
    class CookiesManager
    {
        private CookiesManager() { }

        private static readonly CookiesManager instance = new CookiesManager();
        public static CookiesManager Instance { get => instance; }

        private Dictionary<string, string> cookies = new Dictionary<string, string>();

        public void addCookie(string setCookieHeader)
        {
            string pattern = @"^(Set-Cookie:\s*)([^;=\s]+)=([^;\s]*)(;\s*Expires=[^;]*)?(;\s*Max-Age=\d+)?(;\s*Domain=[^;]*)?(;\s*Path=[^;]*)?(;\s*Secure)?(;\s*HttpOnly)?(;\s*SameSite=(Strict|Lax|None))?(;\s*path=\/[^;\s]*)?(; secure)?$";
            Regex regex = new Regex(pattern, RegexOptions.IgnoreCase);

            if (regex.Match(setCookieHeader).Success)
            {
                //Extract value from Set-Cookie
                string cookie = setCookieHeader.Substring(setCookieHeader.IndexOf(":") + 1).Trim();

                //Splitting by ";" to get the first part which contains name=value
                string nameValuePart = cookie.Split(';')[0];
                //Get cookie name and value 
                string cookieName = nameValuePart.Split('=')[0];
                string cookieValue = nameValuePart.Substring(nameValuePart.IndexOf('=') + 1);
                cookies[cookieName] = cookieValue;
            }
        }

        public string getCookie(string cookieName)
        {
            if (cookies.TryGetValue(cookieName, out string value))
            {
                return value;
            }
            //Avoid crash should be replace by logging file
            return null;
        }
    }
}
