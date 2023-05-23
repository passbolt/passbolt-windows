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
using System.IO;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Utils;
using Windows.Storage.Streams;

namespace passbolt_windows_tests.UnitTests.Utils
{

    [TestClass]
    public class StreamHelperTests
    {
        [TestMethod]
        public async Task ConvertStreamToAccessStream_ValidStream_ReturnsRandomAccessStream()
        {
            byte[] data = { 1, 2, 3, 4, 5 };
            Stream stream = new MemoryStream(data);
            IRandomAccessStream result = await StreamHelper.ConvertStreamToAccessStream(stream);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public async Task ConvertStreamToAccessStream_StreamWithZeroLength_ReturnsEmptyRandomAccessStream()
        {
            // Arrange
            byte[] data = { }; // Empty byte array
            Stream stream = new MemoryStream(data);

            // Act
            IRandomAccessStream result = await StreamHelper.ConvertStreamToAccessStream(stream);

            // Assert
            Assert.IsTrue(result.Size == 0);
        }

        [TestMethod]
        [ExpectedException(typeof(NullReferenceException))]
        public async Task ConvertStreamToAccessStream_InvalidStream_ReturnsNull()
        {
            Stream stream = null;
            IRandomAccessStream result = await StreamHelper.ConvertStreamToAccessStream(stream);
        }
    }
}
