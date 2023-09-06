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
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using passbolt.Models.Messaging.Topics;
using passbolt.Utils;

namespace passbolt_windows_tests.UnitTests.Utils
{
    [TestClass]
    public class ListHelperTests
    {
        [TestMethod]
        public void GetClassContantsToList_ReturnsOnlyStringConstants()
        {
            Type topics = typeof(AuthenticationTopics);

            List<string> result = ListHelper.GetClassContantsToList(topics);

            Assert.AreEqual(8, result.Count);
            CollectionAssert.Contains(result, AuthenticationTopics.DESKTOP_AUTHENTICATE);
            CollectionAssert.Contains(result, AuthenticationTopics.AFTER_LOGIN);
            CollectionAssert.Contains(result, AuthenticationTopics.IS_AUTHENTICATED);
            CollectionAssert.Contains(result, AuthenticationTopics.LOG_OUT);
            CollectionAssert.Contains(result, AuthenticationTopics.SET_SERVER_KEY);
            CollectionAssert.Contains(result, AuthenticationTopics.VERIFY_PASSPHRASE);
            CollectionAssert.Contains(result, AuthenticationTopics.GET_SERVER_KEY);
            CollectionAssert.Contains(result, AuthenticationTopics.VERIFY_SERVER);
        }

        [TestMethod]
        public void GetClassContantsToList_ReturnsEmptyListWithoutContants()
        {
            Type topics = typeof(int);

            List<string> result = ListHelper.GetClassContantsToList(topics);

            Assert.AreEqual(0, result.Count);
        }
    }
}

