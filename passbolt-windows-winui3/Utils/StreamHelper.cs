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
using System.IO;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.Storage.Streams;

namespace passbolt_windows_winui3.Utils
{
    public static class StreamHelper
    {
        /// <summary>
        /// Transform stream to random access stream
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public async static Task<IRandomAccessStream> ConvertStreamToAccessStream(Stream stream)
        {
            var buffer = new byte[stream.Length];
            await stream.ReadAsync(buffer, 0, buffer.Length);
            var randomAccessStream = new InMemoryRandomAccessStream();
            await randomAccessStream.WriteAsync(buffer.AsBuffer());
            return randomAccessStream;
        }
    }
}
