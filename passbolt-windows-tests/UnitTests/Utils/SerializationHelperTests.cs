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
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using passbolt.Models;
using passbolt.Utils;

namespace passbolt_windows_tests.UnitTests.Utils
{
    [TestClass]
    public class SerializationHelperTests
    {
        [TestMethod]
        public void TestSerializationAndDeserialization()
        {
            // Arrange
            var originalObject = new IPC("hello-word", "My message");
            var expectedJson = "{\"topic\":\"hello-word\",\"status\":null,\"message\":\"My message\",\"requestId\":null}";

            // Act
            var actualJson = SerializationHelper.SerializeToJson(originalObject);
            var deserializedObject = SerializationHelper.DeserializeFromJson<IPC>(expectedJson);

            // Assert
            Assert.AreEqual(expectedJson, actualJson);
            Assert.AreEqual(originalObject.topic, deserializedObject.topic);
            Assert.AreEqual(originalObject.message, deserializedObject.message);
        }

        [TestMethod]
        public void TestDeserializationError()
        {
            // Arrange
            var invalidJson = "this is not valid JSON";

            // Act and Assert
            Assert.ThrowsException<JsonReaderException>(() => SerializationHelper.DeserializeFromJson<dynamic>(invalidJson));
        }

        [TestMethod]
        public void TestPreventJsonInjection()
        {
            // Arrange
            var maliciousJson = "{\"$type\":\"System.Diagnostics.Process, System.Diagnostics\",\"StartInfo\":{\"FileName\":\"cmd.exe\",\"Arguments\":\"/c calc.exe\"}}";

            // Act
            Action action = () => SerializationHelper.DeserializeFromJson<dynamic>(maliciousJson);

            // Assert
            var ex = Assert.ThrowsException<InvalidOperationException>(action);
            Assert.AreEqual("Deserialization of type System.Diagnostics.Process is not allowed.", ex.Message);
        }

        [TestMethod]
        public void TestPreventXssAttack()
        {
            // Arrange
            var maliciousJson = "{\"message\":\"<script>alert('XSS')</script>\",\"topic\":\"malicious-topic\"}";

            // Act
            var deserializedPerson = SerializationHelper.DeserializeFromJson<IPC>(maliciousJson);

            // Assert
            Assert.IsFalse(deserializedPerson.message.ToString().Contains("<script>"));
        }
    }
}
