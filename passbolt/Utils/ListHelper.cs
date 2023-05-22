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


using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System;

namespace passbolt.Utils
{
    public static class ListHelper
    {
        /// <summary>
        /// Get all the constants of a class and return them as a list
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static List<string> GetClassContantsToList(Type type)
        {
            FieldInfo[] fields = type.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy);

            List<string> topicList = fields
                .Where(field => field.FieldType == typeof(string))
                .Select(field => (string)field.GetValue(null))
                .ToList();

            return topicList;
        }
    }
}
