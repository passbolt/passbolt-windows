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
* @since         0.0.3
*/

using passbolt_windows_winui3.Models.Files;
using passbolt_windows_winui3.Models;
using passbolt_windows_winui3.Utils;
using System.Runtime.InteropServices.WindowsRuntime;

using Windows.Storage;
using System.Threading.Tasks;
using System.IO;
using System;

namespace passbolt_windows_winui3.Services.DownloadService
{
    public class DownloadService
    {
        /// <summary>
        /// Download file based on ipc message
        /// </summary>
        /// <param name="ipc"></param>
        /// <returns></returns>
        public async Task<StorageFile> Download(IPC ipc)
        {
            var topic = SerializationHelper.DeserializeFromJson<DownloadFile>(ipc.message.ToString());
            var blob = this.DataUrlToBlob(topic.content);
            StorageFile file = await DownloadsFolder.CreateFileAsync(topic.filename, CreationCollisionOption.GenerateUniqueName);

            using (var fileStream = await file.OpenAsync(FileAccessMode.ReadWrite))
            {
                // Get the underlying buffer of the MemoryStream
                byte[] buffer = blob.GetBuffer();

                // Write the buffer into the file
                await fileStream.WriteAsync(buffer.AsBuffer());

                // Flush the buffer to ensure the data is written immediately
                await fileStream.FlushAsync();

                return file;
            }
        }

        /// <summary>
        /// Decode base64 string to byte array
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public byte[] Base64Decode(string input)
        {
            var base64EncodedBytes = Convert.FromBase64String(input);
            return base64EncodedBytes;
        }

        /// <summary>
        /// Data url to blob
        /// </summary>
        /// <param name="dataUrl"></param>
        /// <returns></returns>
        public MemoryStream DataUrlToBlob(string dataUrl)
        {
            var parts = dataUrl.Split(',');
            var base64Data = parts[1];

            var binaryData = Base64Decode(base64Data);

            var stream = new MemoryStream(binaryData, 0, binaryData.Length, true, true);

            return stream;
        }
    }
}
