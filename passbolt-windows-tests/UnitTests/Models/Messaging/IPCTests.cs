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
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Models;
using passbolt.Models.Messaging;
using passbolt.Models.Messaging.Topics;

namespace passbolt_windows_tests.UnitTests.Models
{
    [TestClass]
    public class IPCTests
    {
        [TestMethod]
        public void IPC_ValidTopic_ShouldPassValidation()
        {
            IPC ipc = new IPC(AuthenticationTopics.DESKTOPAUTHENTICATE);

            var validationContext = new ValidationContext(ipc, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(ipc, validationContext, results, true);

            Assert.IsTrue(isValid);
            Assert.AreEqual(0, results.Count);
        }

        [TestMethod]
        public void IPC_InvalidTopic_ShouldFailValidation()
        {
            IPC ipc = new IPC("invalid_topic");

            var validationContext = new ValidationContext(ipc, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(ipc, validationContext, results, true);

            Assert.IsFalse(isValid);
            Assert.AreEqual(1, results.Count);
            Assert.AreEqual("Invalid topic", results[0].ErrorMessage);
        }

        [TestMethod]
        public void IPC_NullTopic_ShouldFailValidation()
        {
            IPC ipc = new IPC(null);

            var validationContext = new ValidationContext(ipc, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(ipc, validationContext, results, true);

            Assert.IsFalse(isValid);
            Assert.AreEqual(1, results.Count);
            Assert.AreEqual("The topic field is required.", results[0].ErrorMessage);
        }

        [TestMethod]
        public void IPC_MessageCanBeEmpty()
        {
            IPC ipc = new IPC(AuthenticationTopics.DESKTOPAUTHENTICATE);

            var validationContext = new ValidationContext(ipc, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(ipc, validationContext, results, true);

            Assert.IsTrue(isValid);
            Assert.AreEqual(0, results.Count);
        }
    }

}
