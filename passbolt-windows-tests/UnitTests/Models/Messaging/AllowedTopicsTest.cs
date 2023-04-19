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

using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Models.Messaging;
using passbolt_windows_tests.Utils;

namespace passbolt_windows_tests.UnitTests.Models.Messaging
{
    [TestClass]
    public class AllowedTopicsTest
    {
        [TestMethod]
        public void IsTopicNameAllowed_ValidTopic_ShouldReturnTrue()
        {
            string validTopic = "initialization";
            bool result = AllowedTopics.IsTopicNameAllowed(validTopic);
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void IsTopicNameAllowed_InvalidTopic_ShouldReturnFalse()
        {
            string invalidTopic = "invalid_topic";
            bool result = AllowedTopics.IsTopicNameAllowed(invalidTopic);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void GetAllTopicNames_ShouldReturnAllTopics()
        {
            List<string> expectedTopics = new List<string> { "initialization" };
            var allowedTopics = new AllowedTopics();
            List<string> actualTopics = ReflectionUtil.InvokePrivateStaticMethod<List<string>>(allowedTopics, "GetAllTopicNames");
            CollectionAssert.AreEqual(expectedTopics, actualTopics);
        }
    }
}
