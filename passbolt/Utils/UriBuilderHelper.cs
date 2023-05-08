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

namespace passbolt.Utils
{
    public class UriBuilderHelper
    {

        /// <summary>
        /// build a host uri for webviews
        /// </summary>
        /// <param name="host"></param>backgroundFolder
        /// <param name="path"></param>
        /// <returns>The uri for the host</returns>
        public static string BuildHostUri(string host, string path)
        {
            UriBuilder builder = new UriBuilder();
            builder.Scheme = "https";
            builder.Host = host;
            builder.Path = path;
            return builder.Uri.ToString();
        }

        /// <summary>
        /// retrieve the host and scheme from a uri
        /// </summary>
        /// <param name="uri"></param>
        /// <returns></returns>
        public static string GetHostAndShemeForUri(string uri)
        {
            UriBuilder builder = new UriBuilder(uri);
            return builder.Scheme + "://" + builder.Host;
        }
    }
}
