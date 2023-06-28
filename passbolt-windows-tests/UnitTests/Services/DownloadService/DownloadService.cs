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

using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Models;
using passbolt.Services.DownloadService;
using System.IO;
using System.Threading.Tasks;
using Windows.Storage;

namespace passbolt_windows_tests.UnitTests.Services
{
    [TestClass]
    public class DownloadServiceTests
    {
        [TestMethod]
        public async Task Download_ValidFile()
        {
            var ipc = new IPC { message = "{ \"content\": \"data:text/plain;base64,SGVsbG8gd29ybGQ=\", \"filename\": \"testfile.txt\" }" };
            var downloadService = new DownloadService();

            var file = await downloadService.Download(ipc);

            var stream = await file.OpenStreamForReadAsync();
            // convert stream to string
            StreamReader reader = new StreamReader(stream);
            string content = reader.ReadToEnd();

            Assert.IsNotNull(file);
            Assert.IsTrue(file.FileType == ".txt");
            Assert.IsTrue(file.Name.Contains("testfile"));
            Assert.AreEqual("Hello world", content);
                
        }

        [TestMethod]
        public void Base64Decode_ValidInput_ReturnsDecodedByteArray()
        {
            var input = "SGVsbG8gd29ybGQ="; 
            var downloadService = new DownloadService();

            var result = downloadService.Base64Decode(input);

            var expected = new byte[] { 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 };
            CollectionAssert.AreEqual(expected, result);
        }

        [TestMethod]
        public void DataUrlToBlob_ValidDataUrl_ReturnsMemoryStream()
        {
            var dataUrl = "data:text/plain;base64,SGVsbG8gd29ybGQ=";
            var downloadService = new DownloadService();

            var result = downloadService.DataUrlToBlob(dataUrl);

            Assert.IsNotNull(result);
            var expected = new byte[] { 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 };
            CollectionAssert.AreEqual(expected, result.ToArray());
        }

    }
}